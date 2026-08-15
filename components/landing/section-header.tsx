import type { ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  action,
  className,
}: {
  eyebrow?: ReactNode
  title: ReactNode
  subtitle?: ReactNode
  action?: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-6 pb-10 md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="mb-3 text-sm font-medium text-muted-foreground">{eyebrow}</p>
        )}
        <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance text-foreground">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 text-lg leading-relaxed text-pretty text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

export function PrimaryLink({
  children,
  href = '#get-started',
}: {
  children: ReactNode
  href?: string
}) {
  return (
    <a
      href={href}
      className="inline-flex h-10 items-center justify-center gap-1.5 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
    >
      {children}
      <ChevronRight className="size-4" aria-hidden />
    </a>
  )
}
