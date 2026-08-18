'use client'

import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from 'react'
import Link from 'next/link'
import { useLenis } from 'lenis/react'
import { ArrowRight, X } from 'lucide-react'
import { MovingBorderButton } from '@/components/ui/moving-border-button'
import { openVoiceSession, type VoiceSession } from '@/lib/voice-session'

type PageScroller = {
  scroll: number
  scrollTo: (target: number) => void
} | undefined

function scrollPageBy(delta: number, scroller: PageScroller) {
  const top = (scroller?.scroll ?? window.scrollY) + delta
  if (scroller) scroller.scrollTo(top)
  else window.scrollTo({ top, behavior: 'smooth' })
}

function revealCardBottom(el: HTMLElement, scroller: PageScroller) {
  const card = el.closest('.group\\/card') ?? el.parentElement ?? el
  const overflow = card.getBoundingClientRect().bottom - window.innerHeight
  if (overflow <= 8) return
  scrollPageBy(overflow, scroller)
}

function revealTalkControl(el: HTMLElement, scroller: PageScroller) {
  const rect = el.getBoundingClientRect()
  const topGap = 12
  const bottomGap = 12
  if (rect.top >= topGap && rect.bottom <= window.innerHeight - bottomGap) return
  const delta =
    rect.top < topGap ? rect.top - topGap : rect.bottom - (window.innerHeight - bottomGap)
  scrollPageBy(delta, scroller)
}

const ORB_MOVE_MS = 500
const MIC_DENIED_MESSAGE = 'Mic permission required to talk to voice agent.'
const MIC_UNAVAILABLE_MESSAGE = 'No microphone found. A mic is required to talk to the voice agent.'
const CONNECT_FAIL_MESSAGE = 'Could not start the call. Try again.'
const STARTING_LINE = 'Call starting…'
const CHAT_KEEP = 24

type ChatLine = {
  id: string
  from: 'agent' | 'user'
  text: string
}

const SESSION_STORE_KEY = 'dw:demo:sessions'

function readSessionCount() {
  try {
    const parsed = Number.parseInt(window.localStorage.getItem(SESSION_STORE_KEY) ?? '0', 10)
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0
  } catch {
    return 0
  }
}

function bumpSessionCount() {
  try {
    window.localStorage.setItem(SESSION_STORE_KEY, String(readSessionCount() + 1))
  } catch {
    // Storage may be unavailable; cap is best-effort.
  }
}

async function ensureMicrophonePermission(): Promise<'granted' | 'denied' | 'unavailable'> {
  if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
    return 'unavailable'
  }
  try {
    if (navigator.permissions?.query) {
      const result = await navigator.permissions.query({ name: 'microphone' as PermissionName })
      if (result.state === 'denied') return 'denied'
      if (result.state === 'granted') return 'granted'
    }
  } catch {
    // Permissions API may not support microphone; fall through to getUserMedia.
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    stream.getTracks().forEach((track) => track.stop())
    return 'granted'
  } catch (err) {
    const name = err instanceof DOMException ? err.name : ''
    if (name === 'NotFoundError' || name === 'DevicesNotFoundError') return 'unavailable'
    return 'denied'
  }
}

export function VoiceAgentCard({
  project,
  sessionCap = 2,
}: {
  project: any
  accent: any
  sessionCap?: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const talkRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const sessionRef = useRef<VoiceSession | null>(null)
  const runIdRef = useRef(0)
  const startingRef = useRef(false)
  const scroller = useLenis()
  const [orbDocked, setOrbDocked] = useState(false)
  const [callLive, setCallLive] = useState(false)
  const [centerLift, setCenterLift] = useState(0)
  const [hangupPos, setHangupPos] = useState({ left: 0, top: 0, size: 28 })
  const [chatBottom, setChatBottom] = useState(96)
  const [stageMessage, setStageMessage] = useState<string | null>(null)
  const [chatLines, setChatLines] = useState<ChatLine[]>([])
  const [orbPulsing, setOrbPulsing] = useState(false)
  const greetingOpenRef = useRef(false)
  const countedRef = useRef(false)
  const micCheckTimerRef = useRef<number | null>(null)

  useLayoutEffect(() => {
    const stage = stageRef.current
    const video = videoRef.current
    if (!stage || !video) return

    const measure = () => {
      const styles = getComputedStyle(stage)
      const padY = parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom)
      setCenterLift(Math.max(0, (stage.clientHeight - padY - video.offsetHeight) / 2))
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(stage)
    observer.observe(video)
    video.addEventListener('loadeddata', measure)
    return () => {
      observer.disconnect()
      video.removeEventListener('loadeddata', measure)
    }
  }, [])

  useLayoutEffect(() => {
    if (!callLive) return
    const stage = stageRef.current
    const video = videoRef.current
    if (!stage || !video) return

    const place = () => {
      const stageRect = stage.getBoundingClientRect()
      const videoRect = video.getBoundingClientRect()
      const size = 16
      setHangupPos({
        left: videoRect.left - stageRect.left + videoRect.width / 2,
        top: videoRect.bottom - stageRect.top + 4,
        size,
      })
      const videoTop = videoRect.top - stageRect.top
      const aboveOrb = window.matchMedia('(min-width: 768px)').matches ? 10 : 4
      setChatBottom(Math.max(36, stage.clientHeight - videoTop + aboveOrb))
    }

    place()
    const observer = new ResizeObserver(place)
    observer.observe(stage)
    observer.observe(video)
    return () => observer.disconnect()
  }, [callLive, orbDocked])

  const closeSession = (restore: boolean) => {
    const session = sessionRef.current
    sessionRef.current = null
    const shouldCount = countedRef.current
    countedRef.current = false
    void session?.stop().catch(() => {})
    if (shouldCount) bumpSessionCount()
    if (!restore) return
    setCallLive(false)
    setOrbDocked(false)
    setStageMessage(null)
    setChatLines([])
    setOrbPulsing(false)
    greetingOpenRef.current = false
    if (talkRef.current) revealTalkControl(talkRef.current, scroller)
  }

  useEffect(() => {
    return () => {
      if (micCheckTimerRef.current != null) {
        window.clearTimeout(micCheckTimerRef.current)
      }
      runIdRef.current += 1
      startingRef.current = false
      closeSession(false)
    }
    // Unmount-only cleanup.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onTalkClick = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (sessionRef.current || startingRef.current) {
      return
    }
    if (readSessionCount() >= sessionCap) {
      return
    }

    const runId = ++runIdRef.current
    startingRef.current = true
    setOrbDocked(true)
    setStageMessage(null)
    if (cardRef.current) revealCardBottom(cardRef.current, scroller)

    if (micCheckTimerRef.current != null) {
      window.clearTimeout(micCheckTimerRef.current)
    }
    micCheckTimerRef.current = window.setTimeout(() => {
      void (async () => {
        if (runId !== runIdRef.current) return

        const permission = await ensureMicrophonePermission()
        if (runId !== runIdRef.current) return
        if (permission !== 'granted') {
          startingRef.current = false
          setOrbDocked(false)
          setStageMessage(permission === 'unavailable' ? MIC_UNAVAILABLE_MESSAGE : MIC_DENIED_MESSAGE)
          return
        }

        let session: VoiceSession | null = null
        try {
          session = await openVoiceSession({
            onEnded: () => {
              if (sessionRef.current !== session) return
              startingRef.current = false
              closeSession(true)
            },
            onPulse: setOrbPulsing,
            onLine: ({ from, text }) => {
              setChatLines((prev) => {
                if (from === 'agent' && greetingOpenRef.current) {
                  greetingOpenRef.current = false
                  return prev.map((line) =>
                    line.id === 'start' ? { ...line, text } : line,
                  )
                }
                return [...prev, { id: crypto.randomUUID(), from, text }].slice(-CHAT_KEEP)
              })
            },
          })
          if (runId !== runIdRef.current) {
            await session.stop().catch(() => {})
            return
          }
          sessionRef.current = session
          const connected = await session.connect()
          if (runId !== runIdRef.current) {
            sessionRef.current = null
            await session.stop().catch(() => {})
            return
          }
          startingRef.current = false
          if (!connected) {
            sessionRef.current = null
            await session.stop().catch(() => {})
            setOrbDocked(false)
            setStageMessage(CONNECT_FAIL_MESSAGE)
          } else {
            setCallLive(true)
            countedRef.current = true
            greetingOpenRef.current = true
            setChatLines([{ id: 'start', from: 'agent', text: STARTING_LINE }])
          }
        } catch {
          sessionRef.current = null
          await session?.stop().catch(() => {})
          if (runId !== runIdRef.current) return
          startingRef.current = false
          setOrbDocked(false)
          setStageMessage(CONNECT_FAIL_MESSAGE)
        }
      })()
    }, ORB_MOVE_MS)
  }

  const onHangupClick = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!callLive && !sessionRef.current) return
    runIdRef.current += 1
    startingRef.current = false
    closeSession(true)
  }

  const stopNav = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div
      id="voice-agent-card"
      ref={cardRef}
      className="flex h-full flex-col p-6 md:p-8 relative w-full text-left"
    >
      <div className="mb-6 flex items-center justify-between">
        <span className="inline-flex items-center rounded-full border border-transparent bg-foreground text-background px-3 py-1 text-xs font-semibold uppercase tracking-wide">
          {project.tag}
        </span>
        <Link
          href={`/portfolio/${project.slug}`}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/50 backdrop-blur px-3 py-1 text-xs font-semibold text-foreground transition-colors hover:bg-foreground hover:text-background group-hover/card:bg-foreground group-hover/card:text-background"
        >
          Read Case Study <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <h3 className="mb-3 flex items-center gap-3 text-3xl sm:text-4xl font-bold text-foreground transition-colors">
        {project.title}
      </h3>
      <p className="mb-6 text-sm sm:text-base leading-relaxed text-muted-foreground/80">
        {project.description}
      </p>

      <div ref={talkRef} className="mb-8 flex flex-col items-start gap-2">
        <MovingBorderButton
          as="span"
          duration={2000}
          onClick={onTalkClick}
          onMouseDown={stopNav}
          containerClassName="relative z-10 inline-flex cursor-pointer transition-transform hover:scale-105 active:scale-95"
          className="inline-flex cursor-pointer items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
          Talk to it now &rarr;
        </MovingBorderButton>
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
          <div
            ref={stageRef}
            className="relative flex min-h-0 h-full w-full flex-1 flex-col items-center justify-end p-6"
          >
            {stageMessage ? (
              <p
                role="status"
                className="absolute inset-x-5 top-2 z-[6] text-center text-sm leading-relaxed text-muted-foreground md:inset-x-[15%] md:top-3"
              >
                {stageMessage}
              </p>
            ) : null}
            {callLive && chatLines.length > 0 ? (
              <div
                className="pointer-events-none absolute top-2 left-[5%] right-[5%] z-[5] flex flex-col justify-end gap-1.5 overflow-hidden md:top-3 md:left-[15%] md:right-[15%] md:gap-2"
                style={{
                  bottom: chatBottom,
                  maskImage: 'linear-gradient(to bottom, transparent 0%, black 14px)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 14px)',
                }}
              >
                {chatLines.map((line) => (
                  <div
                    key={line.id}
                    className={
                      line.from === 'agent'
                        ? 'max-w-[90%] self-start rounded-2xl rounded-tl-md bg-primary px-3 py-1.5 text-[10px] leading-relaxed text-primary-foreground shadow-sm md:px-3.5 md:py-2 md:text-[11px]'
                        : 'max-w-[90%] self-end rounded-2xl rounded-tr-md bg-secondary px-3 py-1.5 text-[10px] leading-relaxed text-secondary-foreground shadow-sm dark:text-white md:px-3.5 md:py-2 md:text-[11px]'
                    }
                  >
                    {line.text}
                  </div>
                ))}
              </div>
            ) : null}
            <div className={`origin-bottom ${orbPulsing ? 'orb-pulse' : ''}`}>
            <video
              ref={videoRef}
              src="/orb-circular-crf30.webm"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              aria-hidden
              style={{
                transform: orbDocked
                  ? 'translateY(0) scale(var(--orb-dock-scale))'
                  : `translateY(-${centerLift}px) scale(1)`,
              }}
              className="pointer-events-none max-h-[200px] w-auto origin-bottom object-contain drop-shadow-[0_10px_18px_rgba(148,148,156,0.38)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] [--orb-dock-scale:0.52] md:[--orb-dock-scale:0.60] dark:drop-shadow-[0_10px_22px_rgba(210,210,218,0.28)]"
            />
            </div>
            {callLive ? (
              <button
                type="button"
                aria-label="End call"
                onClick={onHangupClick}
                onMouseDown={stopNav}
                style={{
                  left: hangupPos.left,
                  top: hangupPos.top,
                  width: hangupPos.size,
                  height: hangupPos.size,
                }}
                className="absolute z-10 flex -translate-x-1/2 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" strokeWidth={2.5} />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
