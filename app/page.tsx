import { SiteNav } from '@/components/landing/site-nav'
import { Hero } from '@/components/landing/hero'
import { StatsTicker } from '@/components/landing/stats-ticker'
import { FeatureIntro } from '@/components/landing/feature-intro'
import { FeatureCards } from '@/components/landing/feature-cards'
import { StatsTrust } from '@/components/landing/stats-trust'
import { Gallery } from '@/components/landing/gallery'
import { CaseStudies } from '@/components/landing/case-studies'
import { LogoWall } from '@/components/landing/logo-wall'
import { Testimonials } from '@/components/landing/testimonials'
import { Pricing } from '@/components/landing/pricing'
import { Faq } from '@/components/landing/faq'
import { CtaBanner } from '@/components/landing/cta-banner'
import { SiteFooter } from '@/components/landing/site-footer'

export default function Page() {
  return (
    <div className="min-h-dvh bg-background">
      <SiteNav />
      <main>
        <Hero />
        <StatsTicker offset={0} />
        <FeatureIntro />
        <FeatureCards />
        <StatsTrust />
        <Gallery />
        <CaseStudies />
        <LogoWall />
        <StatsTicker offset={3} />
        <FeatureIntro variant="secondary" />
        <Testimonials />
        <Pricing />
        <Faq />
        <CtaBanner />
      </main>
      <SiteFooter />
    </div>
  )
}
