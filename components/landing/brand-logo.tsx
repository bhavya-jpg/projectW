import { cn } from '@/lib/utils'

/**
 * BRAND: change the name here and the mark below to rebrand the whole site.
 */
export const BRAND_NAME = 'deWork Labs'

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn('size-6', className)}
      fill="currentColor"
    >
      {/* simple 4-petal / pinwheel mark */}
      {[0, 90, 180, 270].map((deg) => (
        <g key={deg} transform={`rotate(${deg} 12 12)`}>
          <path d="M12 12 C12 6, 16 4, 18 6 C20 8, 18 12, 12 12 Z" opacity="0.9" />
        </g>
      ))}
      <circle cx="12" cy="12" r="1.6" className="fill-background" />
    </svg>
  )
}

export function BrandLogo({
  className,
  markClassName,
}: {
  className?: string
  markClassName?: string
}) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <BrandMark className={cn('text-foreground', markClassName)} />
      <span className="text-lg font-semibold tracking-tight text-foreground">
        {BRAND_NAME}
      </span>
    </span>
  )
}
