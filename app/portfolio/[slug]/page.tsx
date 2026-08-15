import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { SERVICES } from '@/lib/config'
import { SiteNav } from '@/components/landing/site-nav'
import { SiteFooter } from '@/components/landing/site-footer'
import { DrapeAiPreview } from '@/components/landing/drape-ai-preview'

export function generateStaticParams() {
  return SERVICES.filter((s) => s.slug !== 'coming-soon').map((service) => ({
    slug: service.slug,
  }))
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const projectIndex = SERVICES.findIndex((s) => s.slug === slug)
  const project = SERVICES[projectIndex]

  if (!project || project.slug === 'coming-soon') {
    notFound()
  }

  // Find next project for bottom navigation
  const nextProjectIndex = (projectIndex + 1) % SERVICES.length
  let nextProject = SERVICES[nextProjectIndex]
  if (nextProject.slug === 'coming-soon') {
    nextProject = SERVICES[0]
  }

  return (
    <div className="min-h-dvh bg-background">
      <SiteNav />
      <main className="pb-12 pt-24 sm:pb-24 sm:pt-32">
        <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <Link
            href="/#what-we-do"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>

          {/* Hero Section */}
          <header className="mb-10 sm:mb-16">
            <div className="mb-6 inline-flex items-center rounded-md border border-border bg-muted/50 px-3 py-1 text-sm font-medium text-foreground">
              {project.tag}
            </div>
            <h1 className="mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              {project.title}
            </h1>
            <p className="text-xl leading-relaxed text-muted-foreground text-balance">
              {project.description}
            </p>
          </header>

          {/* Hero Image / Dashboard Mockup */}
          <div className="mb-12 sm:mb-20 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
            <div className="flex h-10 w-full items-center gap-1.5 border-b border-border bg-background px-4">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
              <div className="ml-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                DEWORK LABS / {project.title}
              </div>
            </div>
            <div className="w-full bg-[#f6f6fd] dark:bg-[#02060c] p-2 sm:p-4 overflow-hidden">
              {project.slug === 'drape-ai' ? (
                <DrapeAiPreview />
              ) : project.image ? (
                <>
                  {project.imageLight ? (
                    <>
                      <img
                        src={project.imageLight}
                        alt={project.title}
                        className="w-full h-auto rounded-lg object-contain border border-border/50 shadow-sm block dark:hidden mix-blend-multiply"
                      />
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-auto rounded-lg object-contain border border-border/50 shadow-sm hidden dark:block"
                      />
                    </>
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-auto rounded-lg object-contain border border-border/50 shadow-sm"
                    />
                  )}
                </>
              ) : (
                <div className="aspect-[16/9] w-full rounded-lg border border-border/50 bg-background/50 shadow-sm flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-background/20 to-transparent" />
                  <span className="text-muted-foreground/60 text-lg font-medium tracking-wider uppercase">Dashboard Preview</span>
                </div>
              )}
            </div>
          </div>

          {/* Content Sections */}
          <div className="grid gap-10 sm:gap-16 md:grid-cols-12">
            <div className="md:col-span-8 md:col-start-3 space-y-10 sm:space-y-16">
              
              <section>
                <h2 className="mb-6 text-2xl sm:text-3xl font-bold text-foreground">The Problem</h2>
                <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                  <p>{project.problem}</p>
                </div>
              </section>

              <section>
                <h2 className="mb-6 text-2xl sm:text-3xl font-bold text-foreground">The Solution</h2>
                <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                  <p>{project.solution}</p>
                </div>
              </section>

              <section>
                <h2 className="mb-6 text-2xl sm:text-3xl font-bold text-foreground">The Impact</h2>
                <div className="rounded-xl border border-border bg-card p-8">
                  <p className="text-lg font-medium text-foreground text-balance">
                    "{project.impact}"
                  </p>
                </div>
              </section>

              <section>
                <h2 className="mb-6 text-2xl sm:text-3xl font-bold text-foreground">Why it matters</h2>
                <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                  <p>{project.industryContext}</p>
                </div>
              </section>
            </div>
          </div>

          {/* Next Project Navigation */}
          <div className="mt-12 sm:mt-24 border-t border-border pt-8 sm:pt-12">
            <Link
              href={`/portfolio/${nextProject.slug}`}
              className="group flex items-center justify-between rounded-xl border border-transparent p-6 transition-colors hover:bg-muted/50"
            >
              <div>
                <p className="mb-2 text-sm font-medium text-muted-foreground">Next Project</p>
                <h3 className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {nextProject.title}
                </h3>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background transition-colors group-hover:border-primary/50 group-hover:bg-primary/5 group-hover:text-primary text-muted-foreground">
                <ArrowRight className="h-5 w-5" />
              </div>
            </Link>
          </div>

        </article>
      </main>
      <SiteFooter />
    </div>
  )
}
