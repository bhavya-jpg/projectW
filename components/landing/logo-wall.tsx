import { Reveal } from './reveal'
import { COMPANY_LOGOS } from '@/lib/config'

export function LogoWall() {
  return (
    <section id="logo-wall" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal>
        <p className="text-center text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-8">
          Trusted by teams building the future
        </p>
      </Reveal>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
        {COMPANY_LOGOS.map((name, i) => (
          <Reveal key={name} delay={(i % 8) * 50}>
            <div className="flex h-16 items-center justify-center rounded-xl border border-border bg-card transition-colors hover:bg-muted">
              <span className="text-sm font-bold tracking-tight text-foreground/70">
                {name}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

