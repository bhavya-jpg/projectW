'use client'

import { useEffect, useRef, useState } from 'react'
import {
  ChevronRight,
  Search,
  Plus,
  BookOpen,
  Settings,
  Sparkles,
  Blocks,
  Palette,
  Compass,
  GitBranch,
  Globe,
  Rocket,
  TerminalSquare,
  FileCode,
  Boxes,
} from 'lucide-react'
import { BrandMark, BRAND_NAME } from './brand-logo'

const sidebarPrimary = [
  { icon: BookOpen, label: 'Quickstart', active: true },
  { icon: Settings, label: 'Global Settings' },
  { icon: Sparkles, label: 'AI optimization' },
  { icon: Blocks, label: 'Components' },
  { icon: Palette, label: 'Themes' },
]

const sidebarSecondary = [
  { icon: Compass, label: 'Navigation' },
  { icon: GitBranch, label: 'Versioning' },
  { icon: Globe, label: 'Custom Domain' },
]

const cards = [
  { icon: Rocket, title: 'Quickstart', desc: 'Deploy your first workspace in minutes with our step-by-step guide.' },
  { icon: TerminalSquare, title: 'Installation', desc: 'Install the CLI to preview and develop projects locally.' },
  { icon: FileCode, title: 'Web editor', desc: 'Draft and publish directly from the browser, no setup needed.' },
  { icon: Boxes, title: 'Components', desc: 'Compose reusable building blocks across every project.' },
]

export function Hero() {
  const [pct, setPct] = useState(55.92)
  const mockupRef = useRef<HTMLDivElement | null>(null)

  // live-updating pill stat
  useEffect(() => {
    const id = setInterval(() => {
      setPct((p) => {
        const next = p + (Math.random() * 0.4 - 0.15)
        return Math.min(99.9, Math.max(40, Number(next.toFixed(4))))
      })
    }, 1800)
    return () => clearInterval(id)
  }, [])

  // subtle parallax hover on the mockup
  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = mockupRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(1600px) rotateY(${-6 + x * 4}deg) rotateX(${2 - y * 4}deg) translateY(-2px)`
  }
  function onLeave() {
    const el = mockupRef.current
    if (el) el.style.transform = 'perspective(1600px) rotateY(-6deg) rotateX(2deg)'
  }

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 pt-16 pb-20 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-6 lg:px-8 lg:pt-24 lg:pb-28">
        {/* Left */}
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-2 py-1 text-xs font-medium text-muted-foreground">
            <BrandMark className="size-3.5 text-primary" />
            <span className="text-foreground">{BRAND_NAME} AI</span>
            <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] tabular-nums text-foreground">
              {pct.toFixed(4)}%
            </span>
            <ChevronRight className="size-3.5" aria-hidden />
          </div>

          <h1 className="mt-6 font-serif text-5xl leading-[1.05] font-semibold tracking-tight text-balance text-foreground sm:text-6xl">
            The workspace for work with AI
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Plan projects, track issues, and let{' '}
            <span className="font-medium text-foreground">AI agents</span> keep every workflow
            moving.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#get-started"
              className="inline-flex h-11 items-center justify-center gap-1.5 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Start building
              <ChevronRight className="size-4" aria-hidden />
            </a>
            <a
              href="#get-started"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-border bg-card px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              <GoogleIcon className="size-4" />
              Continue with Google
            </a>
          </div>
        </div>

        {/* Right: app mockup */}
        <div className="relative lg:-mr-24 xl:-mr-40" onMouseMove={onMove} onMouseLeave={onLeave}>
          <div
            ref={mockupRef}
            className="origin-left rounded-xl border border-border bg-card shadow-2xl shadow-foreground/10 transition-transform duration-300 ease-out will-change-transform lg:[transform:perspective(1600px)_rotateY(-6deg)_rotateX(2deg)]"
          >
            <MockupWindow pct={pct} />
          </div>
        </div>
      </div>
    </section>
  )
}

function MockupWindow({ pct }: { pct: number }) {
  return (
    <div className="flex overflow-hidden rounded-xl">
      {/* Sidebar */}
      <aside className="hidden w-56 shrink-0 flex-col gap-4 border-r border-border bg-secondary/40 p-3 sm:flex">
        <div className="flex items-center gap-2 px-1 py-1">
          <BrandMark className="size-5 text-primary" />
          <span className="text-sm font-semibold text-foreground">{BRAND_NAME} AI</span>
        </div>
        <button className="flex items-center gap-2 rounded-md bg-primary px-2.5 py-2 text-xs font-medium text-primary-foreground">
          <Plus className="size-3.5" aria-hidden /> New Session
        </button>
        <div className="flex flex-col gap-0.5">
          {sidebarPrimary.map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-2 rounded-md px-2.5 py-1.5 text-xs ${
                item.active
                  ? 'bg-muted font-medium text-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              <item.icon className="size-3.5" aria-hidden />
              {item.label}
            </div>
          ))}
        </div>
        <div className="mt-1 flex flex-col gap-0.5 border-t border-border pt-3">
          {sidebarSecondary.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 rounded-md px-2.5 py-1.5 text-xs text-muted-foreground"
            >
              <item.icon className="size-3.5" aria-hidden />
              {item.label}
            </div>
          ))}
        </div>
      </aside>

      {/* Main */}
      <div className="min-w-0 flex-1 bg-card">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-2.5">
          <div className="flex items-center gap-4 text-xs">
            <span className="border-b-2 border-primary pb-2.5 font-medium text-foreground">
              API Reference
            </span>
            <span className="pb-2.5 text-muted-foreground">Libraries</span>
            <span className="pb-2.5 text-muted-foreground">Changelog</span>
          </div>
          <div className="hidden items-center gap-2 rounded-md border border-border bg-secondary/50 px-2.5 py-1.5 text-xs text-muted-foreground md:flex">
            <Search className="size-3.5" aria-hidden />
            Search or ask
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
            Getting Started
          </p>
          <h3 className="mt-1 font-serif text-xl font-semibold text-foreground">
            Quickstart Guide
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Start building an intelligent workspace in under five minutes. Currently at{' '}
            <span className="font-mono tabular-nums text-foreground">{pct.toFixed(2)}%</span>{' '}
            coverage.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {cards.map((card) => (
              <div
                key={card.title}
                className="rounded-lg border border-border bg-background/60 p-3"
              >
                <div className="flex size-8 items-center justify-center rounded-md border border-border bg-card text-primary">
                  <card.icon className="size-4" aria-hidden />
                </div>
                <p className="mt-2.5 text-sm font-medium text-foreground">{card.title}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z"
      />
    </svg>
  )
}
