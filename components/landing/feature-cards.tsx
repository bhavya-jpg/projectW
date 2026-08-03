import { ShieldCheck, Cable, Users, PencilLine } from 'lucide-react'
import { Reveal } from './reveal'

const SMALL = [
  {
    icon: ShieldCheck,
    title: 'Permissions for every team',
    desc: 'Control access with flexible roles and permissions built for growing organizations.',
  },
  {
    icon: Cable,
    title: 'Connect your stack',
    desc: 'Integrate with the tools your team already uses to keep workflows connected and current.',
  },
  {
    icon: Users,
    title: 'Collaborate with teammates and agents',
    desc: 'Work side by side with humans and AI in one shared workspace built for execution.',
  },
]

export function FeatureCards() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {SMALL.map((feature, i) => (
          <Reveal key={feature.title} delay={i * 80}>
            <article className="bg-diagonal-lines flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-foreground/20">
              <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-background text-foreground shadow-sm">
                <feature.icon className="size-4.5" aria-hidden />
              </div>
              <h3 className="mt-16 text-base font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.desc}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <article className="bg-diagonal-lines mt-6 flex min-h-[380px] flex-col justify-between rounded-xl border border-border bg-card p-6 transition-colors hover:border-foreground/20 sm:p-8">
          <div className="flex size-11 items-center justify-center rounded-lg border border-border bg-background text-foreground shadow-sm">
            <PencilLine className="size-5" aria-hidden />
          </div>
          <div className="max-w-md">
            <h3 className="text-xl font-semibold text-foreground">
              Build on the tools you already use
            </h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              Extend your workflow with APIs, automations, and integrations that fit your existing
              stack.
            </p>
          </div>
        </article>
      </Reveal>
    </section>
  )
}
