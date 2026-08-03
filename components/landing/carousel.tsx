'use client'

import { useRef, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function CarouselArrows({ scrollerRef }: { scrollerRef: React.RefObject<HTMLDivElement | null> }) {
  function scroll(dir: number) {
    const el = scrollerRef.current
    if (!el) return
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 520), behavior: 'smooth' })
  }
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => scroll(-1)}
        aria-label="Previous"
        className="inline-flex size-10 items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors hover:bg-muted"
      >
        <ChevronLeft className="size-4" aria-hidden />
      </button>
      <button
        type="button"
        onClick={() => scroll(1)}
        aria-label="Next"
        className="inline-flex size-10 items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors hover:bg-muted"
      >
        <ChevronRight className="size-4" aria-hidden />
      </button>
    </div>
  )
}

export function Scroller({
  children,
  className,
  scrollerRef,
}: {
  children: ReactNode
  className?: string
  scrollerRef: React.RefObject<HTMLDivElement | null>
}) {
  return (
    <div
      ref={scrollerRef}
      className={cn(
        'no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function useScroller() {
  return useRef<HTMLDivElement | null>(null)
}
