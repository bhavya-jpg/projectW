import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { Reveal } from './reveal'
import { BOOKING_URL } from '@/lib/config'

export function CtaBanner() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
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
              No commitment, just a conversation
            </span>
            <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-[1.05] font-semibold tracking-tight text-balance text-background sm:text-6xl">
              Let's build something groundbreaking.
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-pretty text-background/80">
              Ready to turn your idea into a working AI product? Let's discuss your requirements and how we can help.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={BOOKING_URL}
                className="inline-flex h-11 items-center justify-center gap-1.5 rounded-md bg-background px-5 text-sm font-medium text-foreground transition-colors hover:bg-background/90"
              >
                Book a call
                <ChevronRight className="size-4" aria-hidden />
              </a>
              <a
                href="#solutions"
                className="inline-flex h-11 items-center justify-center rounded-md bg-foreground/40 px-5 text-sm font-medium text-background backdrop-blur-sm transition-colors hover:bg-foreground/55"
              >
                See our work
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
