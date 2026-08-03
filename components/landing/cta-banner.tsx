import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { Reveal } from './reveal'
import { BRAND_NAME } from './brand-logo'

export function CtaBanner() {
  return (
    <section id="get-started" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl border border-border">
          <Image
            src="/halftone/cloud-dark.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-foreground/55" />
          <div className="relative flex flex-col items-center px-6 py-20 text-center sm:py-28">
            <span className="inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground">
              <span className="size-1.5 rounded-full bg-primary" aria-hidden />
              Start free, no credit card required
            </span>
            <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-[1.05] font-semibold tracking-tight text-balance text-background sm:text-6xl">
              Build faster with {BRAND_NAME}.
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-pretty text-background/80">
              Bring issues, projects, docs, and AI agents into one focused workspace. Your team can
              start in minutes.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#get-started"
                className="inline-flex h-11 items-center justify-center gap-1.5 rounded-md bg-background px-5 text-sm font-medium text-foreground transition-colors hover:bg-background/90"
              >
                Start for free
                <ChevronRight className="size-4" aria-hidden />
              </a>
              <a
                href="#contact"
                className="inline-flex h-11 items-center justify-center rounded-md bg-foreground/40 px-5 text-sm font-medium text-background backdrop-blur-sm transition-colors hover:bg-foreground/55"
              >
                Book a demo
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
