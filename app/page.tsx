import { SiteNav } from '@/components/landing/site-nav'
import { Hero } from '@/components/landing/hero'
import { FeatureIntro } from '@/components/landing/feature-intro'
import { CaseStudies } from '@/components/landing/case-studies'
import { LogoWall } from '@/components/landing/logo-wall'
import { Testimonials } from '@/components/landing/testimonials'
import { Faq } from '@/components/landing/faq'
import { CtaBanner } from '@/components/landing/cta-banner'
import { SiteFooter } from '@/components/landing/site-footer'

export default function Page() {
  return (
    <div className="min-h-dvh bg-background">
      <SiteNav />
      <main>
        <Hero />
        <LogoWall />
        <div id="what-we-do">
          <FeatureIntro />
        </div>
        <div id="solutions">
          <CaseStudies />
        </div>
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
