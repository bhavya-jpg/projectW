import { SiteNav } from '@/components/landing/site-nav'
import { Hero } from '@/components/landing/hero'
import { CaseStudies } from '@/components/landing/case-studies'
import { HowItWorksSection } from '@/components/landing/how-it-works'
import { LogoWall } from '@/components/landing/logo-wall'
import { Testimonials } from '@/components/landing/testimonials'
import { Faq } from '@/components/landing/faq'
import { CtaBanner } from '@/components/landing/cta-banner'
import { SiteFooter } from '@/components/landing/site-footer'

function readSessionCap() {
  const parsed = Number.parseInt(process.env.VOICE_AGENT_DEMO_LIMIT ?? '2', 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 2
}

export default function Page() {
  const sessionCap = readSessionCap()
  return (
    <div className="min-h-dvh bg-background">
      <SiteNav />
      <main>
        <Hero />
        <LogoWall />
        <div id="what-we-do">
          <CaseStudies sessionCap={sessionCap} />
        </div>
        <HowItWorksSection />
        <Testimonials />
        <Faq />
        <div id="contact">
          <CtaBanner />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
