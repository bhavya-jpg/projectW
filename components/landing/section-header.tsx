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
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  action?: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-6 border-b border-border pb-10 md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="mb-3 text-sm font-medium text-muted-foreground">{eyebrow}</p>
        )}
        <h2 className="font-serif text-4xl leading-[1.08] font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
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
