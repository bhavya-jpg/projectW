'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SERVICES } from '@/lib/config'
import { SectionHeader } from './section-header'
import { Reveal } from './reveal'
import Lottie from 'lottie-react'
import drapeLottie from '@/public/drape-hero-lottie.json'
import { VoiceAgentCard } from './voice-agent-card'

type AccentConfig = { badge: string; border: string; glow: string; chartActive: string; chartMuted: string; bg: string; text: string; shadow: string }

const ACCENTS: Record<string, AccentConfig> = {
  'smart-crm-suite': {
    badge: 'text-blue-500 border-blue-500/20 bg-blue-500/10',
    border: 'hover:border-blue-500/50',
    glow: 'bg-blue-500/20',
    chartActive: 'bg-blue-500',
    chartMuted: 'bg-blue-500/20',
    bg: 'bg-[#f8fafc] dark:bg-[#020817]',
    text: 'text-blue-500',
    shadow: 'hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] dark:hover:shadow-[0_20px_50px_rgba(59,130,246,0.2)]'
  },
  'ai-brain': {
    badge: 'text-purple-500 border-purple-500/20 bg-purple-500/10',
    border: 'hover:border-purple-500/50',
    glow: 'bg-purple-500/20',
    chartActive: 'bg-purple-500',
    chartMuted: 'bg-purple-500/20',
    bg: 'bg-[#faf5ff] dark:bg-[#0b0416]',
    text: 'text-purple-500',
    shadow: 'hover:shadow-[0_20px_50px_rgba(168,85,247,0.15)] dark:hover:shadow-[0_20px_50px_rgba(168,85,247,0.2)]'
  },
  'ai-voice-agents': {
    badge: 'text-emerald-500 border-emerald-500/20 bg-emerald-500/10',
    border: 'hover:border-emerald-500/50',
    glow: 'bg-emerald-500/20',
    chartActive: 'bg-emerald-500',
    chartMuted: 'bg-emerald-500/20',
    bg: 'bg-[#ecfdf5] dark:bg-[#021c12]',
    text: 'text-emerald-500',
    shadow: 'hover:shadow-[0_20px_50px_rgba(16,185,129,0.15)] dark:hover:shadow-[0_20px_50px_rgba(16,185,129,0.2)]'
  },
  'drape-ai': {
    badge: 'text-pink-500 border-pink-500/20 bg-pink-500/10',
    border: 'hover:border-pink-500/50',
    glow: 'bg-pink-500/20',
    chartActive: 'bg-pink-500',
    chartMuted: 'bg-pink-500/20',
    bg: 'bg-[#fdf2f8] dark:bg-[#1a0511]',
    text: 'text-pink-500',
    shadow: 'hover:shadow-[0_20px_50px_rgba(236,72,153,0.15)] dark:hover:shadow-[0_20px_50px_rgba(236,72,153,0.2)]'
  }
}

export function CaseStudies() {
  return (
    <section className="pt-6 pb-16 sm:pt-12 sm:pb-28 md:pt-16 md:pb-40 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeader
          title="Systems we have put into production."
          subtitle="A selection of AI systems we have designed and deployed for ambitious teams."
        />
      </Reveal>



      <div className="mt-8 sm:mt-12 mx-auto max-w-6xl grid grid-cols-1 gap-6 md:grid-cols-2">
        {SERVICES.map((project, i) => {
          const isVoiceAgent = project.slug === 'ai-voice-agents'
          const accent = ACCENTS[project.slug] || ACCENTS['smart-crm-suite']

          const cardContent = isVoiceAgent ? (
            <VoiceAgentCard project={project} accent={accent} />
          ) : (
            <div className="flex h-full flex-col p-6 md:p-8 relative">
              <div className="mb-6 flex items-center justify-between">
                <span className="inline-flex items-center rounded-full border border-transparent bg-foreground text-background px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                  {project.tag}
                </span>
                
                {/* Visual Indicator for Click */}
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/50 backdrop-blur px-3 py-1 text-xs font-semibold text-foreground transition-colors group-hover/card:bg-foreground group-hover/card:text-background">
                  Read Case Study <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
              
              <h3 className="mb-3 flex items-center gap-3 text-3xl sm:text-4xl font-bold text-foreground transition-colors">
                {project.slug === 'drape-ai' && (
                  <img src="/drape.svg" alt="Drape AI Logo" className="h-8 w-auto md:h-10 drop-shadow-sm" />
                )}
                {project.title}
              </h3>
              <p className="mb-6 text-sm sm:text-base leading-relaxed text-muted-foreground/80">
                {project.description}
              </p>

              <div className={`relative mt-auto w-full flex-1 flex flex-col ${project.slug === 'drape-ai' || project.slug === 'smart-crm-suite' ? 'min-h-[280px] sm:min-h-[360px]' : ''}`}>
                {/* Glow effect behind mockup */}
                <div className="absolute inset-0 top-1/2 z-0 h-[120%] w-full -translate-y-1/2 rounded-full bg-primary/20 blur-[80px] dark:bg-primary/30" />
                
                <div className={`relative z-10 w-full overflow-hidden rounded-xl border border-foreground/10 bg-background shadow-[inset_0_2px_15px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_2px_15px_rgba(255,255,255,0.02)] flex-1 flex flex-col`}>
                
                {project.slug === 'drape-ai' ? (
                  <div className="group/drape relative flex flex-1 h-full w-full items-center justify-center bg-background/50 dark:bg-black/95 p-4">
                    <div className="absolute inset-0 bg-pink-500/5 animate-pulse rounded-xl" />
                    <div className="relative h-full w-full flex items-center justify-center overflow-hidden scale-110">
                      <Lottie animationData={drapeLottie} loop={true} className="h-full w-full object-contain" />
                    </div>
                  </div>
                ) : project.slug === 'smart-crm-suite' ? (
                  <div className="group/crm relative flex flex-1 h-full w-full items-center justify-center bg-white dark:bg-[#070709] p-2 sm:p-3 overflow-hidden">
                    <img
                      src="/services/smart-crm-dashboard-light.png"
                      alt="Smart CRM Suite Dashboard (Light)"
                      className="h-full w-full object-contain rounded-lg transition-transform duration-500 group-hover/card:scale-105 block dark:hidden"
                    />
                    <img
                      src="/services/smart-crm-dashboard.png"
                      alt="Smart CRM Suite Dashboard (Dark)"
                      className="h-full w-full object-contain rounded-lg transition-transform duration-500 group-hover/card:scale-105 hidden dark:block"
                    />
                  </div>
                ) : (
                  <div className={`flex flex-1 w-full p-3 gap-3 ${accent.bg}`}>
                    {/* Sidebar */}
                    <div className="flex w-[20%] flex-col gap-2 border-r border-border/40 pr-2 pt-1">
                      <div className={`h-6 w-full rounded flex items-center gap-2 px-1.5 ${accent.badge}`}>
                        <div className={`h-2.5 w-2.5 rounded-sm ${accent.chartActive}`} />
                        <div className={`h-1.5 flex-1 rounded opacity-80 ${accent.chartActive}`} />
                      </div>
                      <div className="h-6 w-full rounded flex items-center gap-2 px-1.5 opacity-40 mix-blend-luminosity">
                        <div className="h-2.5 w-2.5 rounded-sm bg-foreground/60" />
                        <div className="h-1.5 flex-1 rounded bg-foreground/60" />
                      </div>
                      <div className="h-6 w-full rounded flex items-center gap-2 px-1.5 opacity-40 mix-blend-luminosity">
                        <div className="h-2.5 w-2.5 rounded-sm bg-foreground/60" />
                        <div className="h-1.5 flex-1 rounded bg-foreground/60" />
                      </div>
                    </div>
                    {/* Main Content */}
                    <div className="flex flex-1 flex-col pt-1">
                      {/* Top Header */}
                      <div className="flex justify-between items-center mb-4">
                        <div className="h-2 w-16 bg-foreground/20 rounded" />
                        <div className="h-4 w-4 bg-foreground/10 rounded-full" />
                      </div>
                      
                      {/* Stat tiles */}
                      <div className="mb-4 flex gap-2">
                        <div className="flex-1 rounded-md border border-border/40 bg-background shadow-sm p-2">
                          <div className="mb-2 text-[8px] font-medium text-muted-foreground uppercase flex justify-between items-center">
                            Total Metric
                            <span className="text-emerald-500 text-[7px] flex items-center">↑ 12%</span>
                          </div>
                          <div className="text-sm font-semibold text-foreground">2,845</div>
                        </div>
                        <div className="flex-1 rounded-md border border-border/40 bg-background shadow-sm p-2">
                          <div className="mb-2 text-[8px] font-medium text-muted-foreground uppercase flex justify-between items-center">
                            Conversion
                            <span className="text-emerald-500 text-[7px] flex items-center">↑ 4%</span>
                          </div>
                          <div className="text-sm font-semibold text-foreground">18.2%</div>
                        </div>
                      </div>
                      
                      {/* Bar chart */}
                      <div className="mt-auto rounded-md border border-border/40 bg-background shadow-sm p-2 h-[80px] flex flex-col">
                        <div className="text-[8px] font-medium text-muted-foreground uppercase mb-2">Activity Overview</div>
                        <div className="flex-1 flex items-end gap-[2px] border-b border-border/50 pb-[1px]">
                          {[40, 60, 30, 80, 50, 90, 70, 45, 65, 85, 55, 75, 45, 95].map((height, idx) => (
                            <div key={idx} className={`w-full rounded-t-[1px] ${idx === 5 || idx === 9 ? accent.chartActive : accent.chartMuted}`} style={{ height: `${height}%` }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              </div>
            </div>
          )

          return (
            <Reveal key={project.title} delay={i * 100}>
              <div className="relative group/card h-full w-full flex flex-col">
                <Link
                  href={isVoiceAgent ? '/demo/voice-agent' : `/portfolio/${project.slug}`}
                  className={`relative z-10 flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-[hsl(270,15%,96%)] dark:bg-[hsl(270,15%,10%)] transition-all duration-500 hover:-translate-y-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_50px_rgba(255,255,255,0.05)] hover:border-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                >
                  {cardContent}
                </Link>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
