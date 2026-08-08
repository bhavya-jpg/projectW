'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SERVICES } from '@/lib/config'
import { SectionHeader } from './section-header'
import { Reveal } from './reveal'

export function CaseStudies() {
  return (
    <section className="py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeader
          title={
            <>
              Solutions that deliver.{' '}
              <span className="text-muted-foreground">
                Case studies of AI products we've shipped.
              </span>
            </>
          }
        />
      </Reveal>

      <div className="mt-12 mx-auto max-w-6xl grid grid-cols-1 gap-6 md:grid-cols-2">
        {SERVICES.map((project, i) => {
          const cardContent = (
            <div className="flex h-full flex-col p-6 md:p-8 relative">
              <div className="mb-6 flex items-center justify-between">
                <span className="inline-flex items-center rounded-full border border-border bg-foreground/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-foreground">
                  {project.tag}
                </span>
                
                {/* Visual Indicator for Click */}
                {project.slug !== 'coming-soon' && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-foreground transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    Read Case Study <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                )}
              </div>
              
              <h3 className="mb-3 text-3xl font-bold text-foreground transition-colors group-hover:text-primary md:text-4xl">
                {project.title}
              </h3>
              <p className="mb-8 text-sm leading-relaxed text-muted-foreground md:text-base">
                {project.description}
              </p>

              <div className="relative mt-auto w-full">
                {/* Glow effect behind mockup */}
                <div className="absolute inset-0 top-1/2 z-0 h-[120%] w-full -translate-y-1/2 rounded-full bg-primary/20 blur-[80px] dark:bg-primary/30" />
                
                <div className="relative z-10 w-full overflow-hidden rounded-xl border border-foreground/20 bg-background shadow-2xl shadow-foreground/5 dark:border-white/10 dark:bg-black/80 dark:shadow-black/50 aspect-[16/9]">
                {/* Browser mockup header */}
                <div className="flex h-8 w-full items-center gap-1.5 border-b border-foreground/10 bg-muted/50 px-3 backdrop-blur dark:border-white/10">
                  <div className="h-2 w-2 rounded-full bg-red-500/80" />
                  <div className="h-2 w-2 rounded-full bg-yellow-500/80" />
                  <div className="h-2 w-2 rounded-full bg-green-500/80" />
                  <div className="ml-2 text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
                    DWORKLABS / {project.title}
                  </div>
                </div>
                {/* Content area */}
                {/* TODO: replace with real dashboard screenshot */}
                <div className="flex h-full w-full bg-background dark:bg-[#0a0a0a] p-3">
                  {/* Sidebar */}
                  <div className="flex w-[15%] flex-col gap-1.5 border-r border-border/50 pr-2">
                    <div className="h-2 w-full rounded bg-foreground/10" />
                    <div className="h-2 w-3/4 rounded bg-foreground/5" />
                    <div className="h-2 w-5/6 rounded bg-foreground/5" />
                  </div>
                  {/* Main Content */}
                  <div className="flex flex-1 flex-col pl-3">
                    {/* Stat tiles */}
                    <div className="mb-3 flex gap-2">
                      <div className="flex-1 rounded border border-border/50 bg-foreground/[0.02] p-1.5">
                        <div className="mb-1 text-[8px] text-muted-foreground uppercase">Metric A</div>
                        <div className="text-sm font-semibold text-foreground/80">8.7%</div>
                      </div>
                      <div className="flex-1 rounded border border-border/50 bg-foreground/[0.02] p-1.5">
                        <div className="mb-1 text-[8px] text-muted-foreground uppercase">Metric B</div>
                        <div className="text-sm font-semibold text-foreground/80">52</div>
                      </div>
                      <div className="hidden flex-1 rounded border border-border/50 bg-foreground/[0.02] p-1.5 sm:block">
                        <div className="mb-1 text-[8px] text-muted-foreground uppercase">Metric C</div>
                        <div className="text-sm font-semibold text-foreground/80">+19%</div>
                      </div>
                    </div>
                    {/* Fake Flow/Checklist Row */}
                    <div className="mb-3 flex items-center gap-2 rounded border border-border/50 bg-foreground/[0.01] p-2">
                      <div className="h-3 w-3 rounded-full border border-foreground/20 bg-foreground/5" />
                      <div className="h-1.5 flex-1 rounded-full bg-foreground/5" />
                      <div className="h-3 w-3 rounded-full border border-foreground/20 bg-foreground/5" />
                      <div className="h-1.5 flex-1 rounded-full bg-foreground/5" />
                      <div className="h-3 w-3 rounded-full border border-foreground/20 bg-foreground/10" />
                    </div>
                    {/* Bar chart */}
                    <div className="mt-auto flex h-12 items-end gap-1.5 border-b border-border/50 pb-1">
                      {[40, 60, 30, 80, 50, 90, 70, 45, 65].map((height, idx) => (
                        <div key={idx} className="w-full rounded-t-sm bg-foreground/10" style={{ height: `${height}%` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          )

          if (project.slug === 'coming-soon') {
            return (
              <Reveal key={project.title} delay={i * 100}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card bg-gradient-to-b from-foreground/[0.02] dark:from-white/[0.03] to-transparent transition-all duration-300">
                  {cardContent}
                </div>
              </Reveal>
            )
          }

          return (
            <Reveal key={project.title} delay={i * 100}>
              <Link
                href={`/portfolio/${project.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card bg-gradient-to-b from-foreground/[0.02] dark:from-white/[0.03] to-transparent transition-all duration-300 hover:-translate-y-1 hover:border-foreground/30 hover:shadow-xl hover:shadow-foreground/5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              >
                {cardContent}
              </Link>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
