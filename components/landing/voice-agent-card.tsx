'use client'

import { ArrowRight } from 'lucide-react'

export function VoiceAgentCard({ project, accent }: { project: any, accent: any }) {
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
        <span className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-6 py-2.5 text-sm font-semibold transition-transform hover:scale-105 active:scale-95 group-hover:bg-primary group-hover:text-primary-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
          Talk to it now &rarr;
        </span>
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
            <div className="flex items-center gap-1.5 h-16">
              {[0, 1, 2, 3, 4, 5, 6].map((j) => (
                <div
                  key={j}
                  className="w-2.5 rounded-full bg-green-500/80 animate-waveform"
                  style={{
                    height: '100%',
                    animationDelay: `${j * 0.15}s`,
                    animationDuration: '1.2s',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
