import { Share2, LayoutDashboard, PhoneCall, Brain } from 'lucide-react'
import { Reveal } from './reveal'

const FEATURES = [
  {
    icon: Share2,
    title: 'Referral & Growth Engine',
    desc: 'Turn your happiest customers into your best acquisition channel. Our referral engine lets you launch branded referral and affiliate programs in days, not months — track rewards, automate payouts, and watch word-of-mouth compound into predictable growth, all without writing a line of code.',
  },
  {
    icon: LayoutDashboard,
    title: 'Smart CRM Suite',
    desc: 'A CRM your sales team will actually use. Manage leads, deals, and customer relationships from one clean dashboard — with automated follow-ups, pipeline visibility, and reporting built in, so nothing slips through the cracks and every rep knows exactly what to do next.',
  },
  {
    icon: PhoneCall,
    title: 'AI Voice Agents',
    desc: 'Never miss a customer call again. Our voice agents answer, qualify, and route calls around the clock — handling FAQs, booking appointments, and capturing leads in a natural, human-like voice, so your team spends time closing deals instead of picking up the phone.',
  },
  {
    icon: Brain,
    title: 'AI Brain',
    desc: 'Give your business its own intelligent knowledge layer. AI Brain ingests your documents, policies, and data to become an instant expert on your company — answering employee questions, powering support, and surfacing insights on demand, so knowledge is never locked away in someone\'s inbox.',
  },
]

export function FeatureCards() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature, i) => (
          <Reveal key={feature.title} delay={i * 80}>
            <article className="bg-diagonal-lines flex h-full flex-col justify-between rounded-xl border border-border bg-card p-6 transition-colors hover:border-foreground/20 sm:p-8">
              <div>
                <div className="flex size-11 items-center justify-center rounded-lg border border-border bg-background text-foreground shadow-sm">
                  <feature.icon className="size-5" aria-hidden />
                </div>
                <h3 className="mt-8 text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{feature.desc}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

