'use client'

import { SectionHeader } from './section-header'
import { Reveal } from './reveal'
import { TESTIMONIALS } from '@/lib/config'
import { StaggerTestimonials } from '@/components/ui/stagger-testimonials'

export function Testimonials() {
  const formattedTestimonials = TESTIMONIALS.map((t, index) => ({
    tempId: index,
    testimonial: t.quote,
    by: `${t.name}, ${t.role} at ${t.company}`,
    imgSrc: t.avatar,
  }))

  return (
    <section id="testimonials" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeader
          title="What our partners say."
          subtitle="Don't just take our word for it. Here's what engineering and product leaders have to say about our work."
        />
      </Reveal>

      <div className="mt-10">
        <StaggerTestimonials items={formattedTestimonials} />
      </div>
    </section>
  )
}
