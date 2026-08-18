'use client';

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  AgentState,
  BrowserAudioInterface,
  ConversationAgent,
  InteractionType,
  ServerTranscriptMsg,
} from "sarvam-conv-ai-sdk/browser";
import { SARVAM_CONFIG } from "@/lib/sarvam";

type CallStatus = "idle" | "checking_mic" | "connecting" | "connected" | "error";

type TranscriptEntry = {
  id: string;
  role: "user" | "bot";
  content: string;
};

async function ensureMicrophonePermission(): Promise<"granted" | "denied" | "unavailable"> {
  if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
    return "unavailable";
  }
  try {
    if (navigator.permissions?.query) {
      const result = await navigator.permissions.query({ name: "microphone" as PermissionName });
      if (result.state === "denied") return "denied";
      if (result.state === "granted") return "granted";
    }
  } catch {}
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach((t) => t.stop());
    return "granted";
  } catch (err) {
    const name = err instanceof DOMException ? err.name : "";
    if (name === "NotAllowedError" || name === "PermissionDeniedError") return "denied";
    if (name === "NotFoundError" || name === "DevicesNotFoundError") return "unavailable";
    return "denied";
  }
}

export function VoiceAgentCard({ project, accent }: { project: any, accent: any }) {
  const agentRef = useRef<ConversationAgent | null>(null);
  const agentStateRef = useRef<AgentState>(AgentState.IDLE);
  const userSpeakingRef = useRef(false);
  const waveLevelRef = useRef(0);

  const [status, setStatus] = useState<CallStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [transcripts, setTranscripts] = useState<TranscriptEntry[]>([]);

  // Force re-renders for waveform updates when connected
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    let animationId: number;
    if (status === "connected") {
      const updateLoop = () => {
        setFrame(f => f + 1);
        animationId = requestAnimationFrame(updateLoop);
      };
      animationId = requestAnimationFrame(updateLoop);
    }
    return () => cancelAnimationFrame(animationId);
  }, [status]);

  useEffect(() => {
    return () => {
      const agent = agentRef.current;
      agentRef.current = null;
      void agent?.stop().catch(() => {});
    };
  }, []);

  const resetCallUi = () => {
    waveLevelRef.current = 0;
    userSpeakingRef.current = false;
    agentStateRef.current = AgentState.IDLE;
    setTranscripts([]);
  };

  const startCall = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (agentRef.current || status === "checking_mic" || status === "connecting") return;

    setError(null);
    setWarning(null);
    resetCallUi();
    setStatus("checking_mic");

    const micPermission = await ensureMicrophonePermission();
    if (micPermission !== "granted") {
      setWarning(micPermission === "unavailable" ? "No microphone found." : "Microphone access denied.");
      setStatus("idle");
      return;
    }

    setStatus("connecting");
    let agent: ConversationAgent | null = null;

    try {
      const audioInterface = new BrowserAudioInterface();
      agent = new ConversationAgent({
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
        },
        eventCallback: async (event) => {
          if (event.type === "server.event.user_speech_start") {
            userSpeakingRef.current = true;
          } else if (event.type === "server.event.user_speech_end") {
            userSpeakingRef.current = false;
          }
        },
        audioLevelCallback: (level) => {
          const amp = Math.max(level.rms, level.peak * 0.85);
          if (level.direction === "output" && agentStateRef.current === AgentState.SPEAKING) {
            waveLevelRef.current = amp;
          } else if (level.direction === "input" && agentStateRef.current !== AgentState.SPEAKING) {
            waveLevelRef.current = (userSpeakingRef.current || amp >= 0.035) ? amp : 0;
          }
        },
        startCallback: async () => setStatus("connected"),
        endCallback: async () => {
          setStatus("idle");
          agentRef.current = null;
          resetCallUi();
        },
      });

      agentRef.current = agent;
      await agent.start();
      const connected = await agent.waitForConnect(10);
      if (!connected) throw new Error("Connection timed out.");
      setStatus("connected");
    } catch (err) {
      setError(err instanceof Error && err.message.includes("500") ? "Internal Server Error. Did you add SARVAM_API_KEY to your .env.local file?" : (err instanceof Error ? err.message : "Failed to start."));
      setStatus("error");
      agentRef.current = null;
      resetCallUi();
      if (agent) await agent.stop().catch(() => {});
    }
  };

  const stopCall = async (e: React.MouseEvent) => {
    e.preventDefault();
    const agent = agentRef.current;
    agentRef.current = null;
    setStatus("idle");
    setError(null);
    setWarning(null);
    resetCallUi();
    if (agent) await agent.stop().catch(() => {});
  };

  const isBusy = status === "checking_mic" || status === "connecting" || status === "connected";
  const waveAmp = waveLevelRef.current;

  return (
    <div id="voice-agent-card" className="flex h-full flex-col p-6 md:p-8 relative w-full text-left">
      <div className="mb-6 flex items-center justify-between">
        <span className="inline-flex items-center rounded-full border border-transparent bg-foreground text-background px-3 py-1 text-xs font-semibold uppercase tracking-wide">
          {project.tag}
        </span>
        
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/50 backdrop-blur px-3 py-1 text-xs font-semibold text-foreground transition-colors group-hover/card:bg-foreground group-hover/card:text-background">
          Read Case Study <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>

      <h3 className="mb-3 flex items-center gap-3 text-3xl sm:text-4xl font-bold text-foreground transition-colors">
        {project.title}
      </h3>
      <p className="mb-6 text-sm sm:text-base leading-relaxed text-muted-foreground/80">
        {project.description}
      </p>

      <div className="mb-8 flex flex-col items-start gap-2">
        {!isBusy ? (
          <button 
            onClick={startCall}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-6 py-2.5 text-sm font-semibold transition-transform hover:scale-105 active:scale-95 group-hover:bg-primary group-hover:text-primary-foreground"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
            Talk to it now &rarr;
          </button>
        ) : (
          <button 
            onClick={stopCall}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 px-6 py-2.5 text-sm font-semibold transition-transform hover:scale-105 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><line x1="19" x2="5" y1="5" y2="19"/></svg>
            End Call
          </button>
        )}
        
        <p className="text-xs text-muted-foreground h-4">
          {status === "checking_mic" && "Checking microphone..."}
          {status === "connecting" && "Connecting to Riya..."}
          {status === "error" && (error || "Couldn't connect")}
          {status === "idle" && warning && <span className="text-amber-500">{warning}</span>}
          {status === "connected" && (agentStateRef.current === AgentState.SPEAKING ? "Riya is speaking" : userSpeakingRef.current ? "You're speaking" : "Listening...")}
        </p>
      </div>

      <div className="relative mt-auto w-full flex-1 flex flex-col">
        <div className="absolute inset-0 top-1/2 z-0 h-[120%] w-full -translate-y-1/2 rounded-full bg-primary/20 blur-[80px] dark:bg-primary/30" />
        <div className="relative z-10 w-full overflow-hidden rounded-xl border border-foreground/10 bg-background shadow-[inset_0_2px_15px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_2px_15px_rgba(255,255,255,0.02)] flex-1 flex flex-col min-h-[300px]">
          <div className="flex h-8 w-full items-center gap-1.5 border-b border-foreground/10 bg-muted/50 px-3 backdrop-blur dark:border-white/10">
            <div className="h-2 w-2 rounded-full bg-red-500/80" />
            <div className="h-2 w-2 rounded-full bg-yellow-500/80" />
            <div className="h-2 w-2 rounded-full bg-green-500/80" />
            <div className="ml-2 text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
              DWORKLABS / {project.title}
            </div>
          </div>
          <div className={`relative flex flex-1 h-full w-full items-center justify-center p-8 ${accent.bg}`}>
            
            {transcripts.length > 0 && (
              <div className="absolute inset-4 flex flex-col gap-3 overflow-y-auto pr-2 pb-16 scrollbar-thin scrollbar-thumb-foreground/10 scrollbar-track-transparent">
                {transcripts.map((t) => (
                  <div key={t.id} className={`flex w-full ${t.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm shadow-sm ${t.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-muted border border-border/50 text-foreground rounded-tl-sm'}`}>
                      {t.content}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className={`flex items-center gap-1.5 h-16 transition-all duration-500 ${transcripts.length > 0 ? 'absolute bottom-4 left-1/2 -translate-x-1/2 scale-75 opacity-70' : ''}`}>
              {[0, 1, 2, 3, 4, 5, 6].map((j) => {
                // If connected, map amplitude to height. Otherwise use default CSS animation.
                const isLive = status === "connected";
                const baseHeight = 20;
                // Add some pseudo-randomness for each bar based on amplitude
                const randomMultiplier = 0.5 + (Math.sin(j * 1.5 + frame * 0.1) * 0.5); 
                const liveHeight = baseHeight + (waveAmp * 150 * randomMultiplier);
                const boundedHeight = Math.min(100, Math.max(10, liveHeight));

                return (
                  <div
                    key={j}
                    className={`w-2.5 rounded-full bg-green-500/80 ${isLive ? 'transition-all duration-75' : 'animate-waveform'}`}
                    style={isLive ? {
                      height: `${boundedHeight}%`
                    } : {
                      height: '100%',
                      animationDelay: `${j * 0.15}s`,
                      animationDuration: '1.2s'
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
