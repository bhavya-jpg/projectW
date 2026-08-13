"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AgentState,
  BrowserAudioInterface,
  ConversationAgent,
  InteractionType,
  type ServerTranscriptMsg,
} from "sarvam-conv-ai-sdk/browser";
import { SARVAM_CONFIG } from "@/lib/sarvam";
import CallWaveform, { type WaveformMode } from "@/components/CallWaveform";

type CallStatus =
  | "idle"
  | "checking_mic"
  | "connecting"
  | "connected"
  | "error";

type TranscriptEntry = {
  id: string;
  role: "user" | "bot";
  content: string;
};

type TalkToAgentProps = {
  children?: ReactNode;
};

const MIC_DENIED_WARNING =
  "Microphone access is required to talk with Riya. Enable it in your browser settings, then try again.";

const USER_SPEECH_THRESHOLD = 0.035;

async function ensureMicrophonePermission(): Promise<
  "granted" | "denied" | "unavailable"
> {
  if (
    typeof navigator === "undefined" ||
    !navigator.mediaDevices?.getUserMedia
  ) {
    return "unavailable";
  }

  try {
    if (navigator.permissions?.query) {
      const result = await navigator.permissions.query({
        name: "microphone" as PermissionName,
      });
      if (result.state === "denied") {
        return "denied";
      }
      if (result.state === "granted") {
        return "granted";
      }
    }
  } catch {
    // Permissions API may not support microphone in some browsers; fall through to getUserMedia.
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach((track) => track.stop());
    return "granted";
  } catch (err) {
    const name = err instanceof DOMException ? err.name : "";
    if (name === "NotAllowedError" || name === "PermissionDeniedError") {
      return "denied";
    }
    if (name === "NotFoundError" || name === "DevicesNotFoundError") {
      return "unavailable";
    }
    return "denied";
  }
}

export default function TalkToAgent({ children }: TalkToAgentProps) {
  const agentRef = useRef<ConversationAgent | null>(null);
  const agentStateRef = useRef<AgentState>(AgentState.IDLE);
  const userSpeakingRef = useRef(false);
  const waveModeRef = useRef<WaveformMode>("silence");
  const waveLevelRef = useRef(0);
  const transcriptEndRef = useRef<HTMLDivElement | null>(null);

  const [status, setStatus] = useState<CallStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [transcripts, setTranscripts] = useState<TranscriptEntry[]>([]);
  const [speakerLabel, setSpeakerLabel] = useState<"agent" | "user" | "silence">(
    "silence",
  );

  useEffect(() => {
    return () => {
      const agent = agentRef.current;
      agentRef.current = null;
      void agent?.stop().catch(() => undefined);
    };
  }, []);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [transcripts]);

  const setWave = (mode: WaveformMode, level = 0) => {
    waveModeRef.current = mode;
    waveLevelRef.current = level;
    setSpeakerLabel((prev) => (prev === mode ? prev : mode));
  };

  const resetCallUi = () => {
    setWave("silence", 0);
    userSpeakingRef.current = false;
    agentStateRef.current = AgentState.IDLE;
  };

  const startCall = async () => {
    if (
      agentRef.current ||
      status === "checking_mic" ||
      status === "connecting"
    ) {
      return;
    }

    setError(null);
    setWarning(null);
    setTranscripts([]);
    resetCallUi();
    setStatus("checking_mic");

    const micPermission = await ensureMicrophonePermission();
    if (micPermission !== "granted") {
      setWarning(
        micPermission === "unavailable"
          ? "No microphone was found. Connect a mic and try again."
          : MIC_DENIED_WARNING,
      );
      setStatus("idle");
      return;
    }

    setStatus("connecting");

    let agent: ConversationAgent | null = null;

    try {
      const audioInterface = new BrowserAudioInterface();
      agent = new ConversationAgent({
        // Key is injected by /api/sarvam proxy; value here is unused.
        apiKey: "proxied",
        baseUrl: SARVAM_CONFIG.proxyBaseUrl,
        platform: "browser",
        config: {
          user_identifier_type: "custom",
          user_identifier: `web-${crypto.randomUUID()}`,
          org_id: SARVAM_CONFIG.orgId,
          workspace_id: SARVAM_CONFIG.workspaceId,
          app_id: SARVAM_CONFIG.appId,
          version: SARVAM_CONFIG.version,
          interaction_type: InteractionType.CALL,
          input_sample_rate: SARVAM_CONFIG.inputSampleRate,
          output_sample_rate: SARVAM_CONFIG.outputSampleRate,
          agent_variables: { ...SARVAM_CONFIG.agentVariables },
        },
        audioInterface,
        transcriptCallback: async (msg: ServerTranscriptMsg) => {
          const content = msg.content?.trim();
          if (!content) return;
          const role = msg.role === "bot" ? "bot" : "user";
          setTranscripts((prev) => [
            ...prev,
            {
              id: `${msg.timestamp ?? Date.now()}-${role}-${prev.length}`,
              role,
              content,
            },
          ]);
        },
        stateCallback: (newState) => {
          agentStateRef.current = newState;
          if (newState === AgentState.SPEAKING) {
            setWave("agent", waveLevelRef.current);
          } else if (userSpeakingRef.current) {
            setWave("user", waveLevelRef.current);
          } else {
            setWave("silence", 0);
          }
        },
        eventCallback: async (event) => {
          if (event.type === "server.event.user_speech_start") {
            userSpeakingRef.current = true;
            if (agentStateRef.current !== AgentState.SPEAKING) {
              setWave("user", waveLevelRef.current);
            }
          } else if (event.type === "server.event.user_speech_end") {
            userSpeakingRef.current = false;
            if (agentStateRef.current !== AgentState.SPEAKING) {
              setWave("silence", 0);
            }
          }
        },
        audioLevelCallback: (level) => {
          const amp = Math.max(level.rms, level.peak * 0.85);
          const speaking = agentStateRef.current === AgentState.SPEAKING;

          if (level.direction === "output" && speaking) {
            setWave("agent", amp);
            return;
          }

          if (level.direction === "input" && !speaking) {
            const active =
              userSpeakingRef.current || amp >= USER_SPEECH_THRESHOLD;
            if (active) {
              userSpeakingRef.current = true;
              setWave("user", amp);
            } else {
              userSpeakingRef.current = false;
              setWave("silence", 0);
            }
          }
        },
        startCallback: async () => {
          setStatus("connected");
        },
        endCallback: async () => {
          setStatus("idle");
          agentRef.current = null;
          resetCallUi();
        },
      });

      agentRef.current = agent;
      await agent.start();
      const connected = await agent.waitForConnect(10);

      if (!connected) {
        throw new Error("Connection timed out. Check your network and try again.");
      }

      setStatus("connected");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to start the voice agent.";
      setError(message);
      setStatus("error");
      agentRef.current = null;
      resetCallUi();
      if (agent) {
        await agent.stop().catch(() => undefined);
      }
    }
  };

  const stopCall = async () => {
    const agent = agentRef.current;
    agentRef.current = null;
    setStatus("idle");
    setError(null);
    setWarning(null);
    resetCallUi();
    if (agent) {
      await agent.stop().catch(() => undefined);
    }
  };

  const isBusy =
    status === "checking_mic" ||
    status === "connecting" ||
    status === "connected";

  const showWaveform =
    status === "connecting" || status === "connected";

  return (
    <div className="grid w-full grid-cols-1 items-start gap-6 lg:grid-cols-[3fr_2fr] lg:gap-8">
      {/* Left — Talk to Riya flow (60%) */}
      <section className="flex min-w-0 flex-col justify-center gap-8 lg:min-h-[28rem]">
        {children}

        <div className="flex flex-col items-start gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {!isBusy ? (
              <button
                type="button"
                onClick={() => void startCall()}
                className="rounded-md bg-[var(--accent)] px-6 py-3 text-sm font-semibold tracking-wide text-[var(--accent-fg)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                Talk to Riya
              </button>
            ) : status === "connected" || status === "connecting" ? (
              <button
                type="button"
                onClick={() => void stopCall()}
                className="rounded-md border border-[var(--ink)]/20 bg-white/70 px-6 py-3 text-sm font-semibold tracking-wide text-[var(--ink)] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
              >
                End call
              </button>
            ) : (
              <button
                type="button"
                disabled
                className="rounded-md bg-[var(--accent)] px-6 py-3 text-sm font-semibold tracking-wide text-[var(--accent-fg)] opacity-70"
              >
                Talk to Riya
              </button>
            )}
            <p className="text-sm text-[var(--muted)]" aria-live="polite">
              {status === "idle" && !warning && "Ready when you are"}
              {status === "idle" && warning && "Microphone required"}
              {status === "checking_mic" && "Checking microphone permission…"}
              {status === "connecting" && "Connecting…"}
              {status === "connected" &&
                speakerLabel === "agent" &&
                "Riya is speaking"}
              {status === "connected" &&
                speakerLabel === "user" &&
                "You’re speaking"}
              {status === "connected" &&
                speakerLabel === "silence" &&
                "Listening…"}
              {status === "error" && "Couldn’t connect"}
            </p>
          </div>

          {warning ? (
            <p
              className="max-w-md rounded-md border border-amber-300/80 bg-amber-50 px-3 py-2 text-sm text-amber-950"
              role="status"
            >
              {warning}
            </p>
          ) : null}
          {error ? (
            <p className="max-w-md text-sm text-red-700" role="alert">
              {error}
            </p>
          ) : null}

          {showWaveform ? (
            <div className="w-full max-w-xl rounded-lg border border-[var(--ink)]/10 bg-white/55 px-3 py-2 backdrop-blur-sm">
              <div className="mb-1 flex items-center justify-between gap-3 text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
                <span>Audio</span>
                <span>
                  {speakerLabel === "agent"
                    ? "Agent"
                    : speakerLabel === "user"
                      ? "You"
                      : "Silence"}
                </span>
              </div>
              <CallWaveform modeRef={waveModeRef} levelRef={waveLevelRef} />
            </div>
          ) : null}
        </div>
      </section>

      {/* Right — fixed-size scrollable chat (fits ≥3 recent turns) */}
      <aside className="flex h-[28rem] w-full min-w-0 shrink-0 flex-col overflow-hidden rounded-2xl border border-[var(--ink)]/10 bg-white/70 shadow-[0_12px_40px_-24px_rgba(20,32,28,0.35)] backdrop-blur-sm">
        <header className="shrink-0 border-b border-[var(--ink)]/8 px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
            Conversation
          </p>
          <p className="text-sm font-semibold text-[var(--ink)]">Live chat</p>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-4">
          {transcripts.length === 0 ? (
            <div className="flex h-full items-center justify-center px-4 text-center">
              <p className="max-w-[16rem] text-sm leading-relaxed text-[var(--muted)]">
                Messages will appear here like a chat — Riya on the left, you on
                the right.
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-2.5">
              {transcripts.map((entry) => {
                const isUser = entry.role === "user";
                return (
                  <li
                    key={entry.id}
                    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                        isUser
                          ? "rounded-br-md bg-[#8B5A2B] text-[#f7f1e8]"
                          : "rounded-bl-md bg-[#e7f4ec] text-[var(--ink)]"
                      }`}
                    >
                      <p
                        className={`mb-1 text-[10px] font-semibold uppercase tracking-wide ${
                          isUser ? "text-[#f0e0d0]/70" : "text-[#1F8A4C]"
                        }`}
                      >
                        {isUser ? "You" : "Riya"}
                      </p>
                      <p>{entry.content}</p>
                    </div>
                  </li>
                );
              })}
              <div ref={transcriptEndRef} />
            </ul>
          )}
        </div>
      </aside>
    </div>
  );
}
