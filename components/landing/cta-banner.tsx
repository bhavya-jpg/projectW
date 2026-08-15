import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { Reveal } from './reveal'
import { BOOKING_URL } from '@/lib/config'
import { SpecularButton } from '@/components/ui/SpecularButton'

export function CtaBanner() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 pt-10 pb-16 sm:pt-16 sm:pb-28 md:pt-20 md:pb-40 sm:px-6 lg:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
          <Image
            src="/halftone/cloud-dark.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-black/75" />
          <div className="relative flex flex-col items-center px-6 py-12 text-center sm:py-20 md:py-28">
            <h2 className="mt-6 max-w-3xl text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance text-white">
              Let's build something groundbreaking.
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-pretty text-white/80">
              Ready to turn your idea into a working AI product? Let's discuss your requirements and how we can help.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <SpecularButton
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                size="md"
                radius={12}
                tint="#ffffff"
                tintOpacity={0.15}
                blur={10}
                textColor="#ffffff"
                lineColor="#ffffff"
                baseColor="#666666"
                intensity={1.4}
                shineSize={15}
                shineFade={40}
                thickness={2}
                speed={0.4}
                followMouse
                proximity={300}
                autoAnimate
              >
                Book a call
                <ChevronRight className="size-4" aria-hidden />
              </SpecularButton>
              <a
                href="#what-we-do"
                className="inline-flex h-11 items-center justify-center rounded-md bg-white/10 border border-white/20 px-5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
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
