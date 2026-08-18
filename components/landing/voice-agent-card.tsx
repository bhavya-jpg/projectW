'use client'

import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import { MovingBorderButton } from '@/components/ui/moving-border-button'

function revealCardBottom(el: HTMLElement) {
  const card = el.closest('a') ?? el
  const rect = card.getBoundingClientRect()
  const overflow = rect.bottom - window.innerHeight
  if (overflow <= 8) return
  window.scrollTo({ top: window.scrollY + overflow, behavior: 'smooth' })
}

const ORB_MOVE_MS = 500
const MIC_DENIED_MESSAGE = 'Mic permission required to talk to voice agent.'
const MIC_UNAVAILABLE_MESSAGE = 'No microphone found. A mic is required to talk to the voice agent.'

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

export function VoiceAgentCard({ project }: { project: any, accent: any }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [orbDocked, setOrbDocked] = useState(false)
  const [centerLift, setCenterLift] = useState(0)
  const [micMessage, setMicMessage] = useState<string | null>(null)
  const micCheckTimerRef = useRef<number | null>(null)

  useLayoutEffect(() => {
    const stage = stageRef.current
    const video = videoRef.current
    if (!stage || !video) return

    const measure = () => {
      setCenterLift(Math.max(0, (stage.clientHeight - video.offsetHeight) / 2))
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

  useEffect(() => {
    return () => {
      if (micCheckTimerRef.current != null) {
        window.clearTimeout(micCheckTimerRef.current)
      }
    }
  }, [])

  const onTalkClick = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setOrbDocked(true)
    setMicMessage(null)
    if (cardRef.current) revealCardBottom(cardRef.current)

    if (micCheckTimerRef.current != null) {
      window.clearTimeout(micCheckTimerRef.current)
    }
    micCheckTimerRef.current = window.setTimeout(() => {
      void (async () => {
        const permission = await ensureMicrophonePermission()
        if (permission === 'granted') {
          setMicMessage(null)
          return
        }
        setMicMessage(permission === 'unavailable' ? MIC_UNAVAILABLE_MESSAGE : MIC_DENIED_MESSAGE)
      })()
    }, ORB_MOVE_MS)
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
        <MovingBorderButton
          as="span"
          duration={2000}
          onClick={onTalkClick}
          onMouseDown={stopNav}
          containerClassName="relative z-10 inline-flex transition-transform hover:scale-105 active:scale-95"
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold"
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
            {micMessage ? (
              <p
                role="status"
                className="absolute inset-x-6 top-[28%] text-center text-sm leading-relaxed text-muted-foreground"
              >
                {micMessage}
              </p>
            ) : null}
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
                  ? 'translateY(0) scale(0.52)'
                  : `translateY(-${centerLift}px) scale(1)`,
              }}
              className="pointer-events-none max-h-[200px] w-auto origin-bottom object-contain drop-shadow-[0_10px_18px_rgba(148,148,156,0.38)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] dark:drop-shadow-[0_10px_22px_rgba(210,210,218,0.28)]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
