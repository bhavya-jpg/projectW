import { CountUp } from './count-up'
import { BRAND_NAME } from './brand-logo'

const STATS = [
  { label: 'Workflows synced', value: 21751 },
  { label: 'Issues triaged', value: 2849085 },
  { label: 'Project updates', value: 319768 },
  { label: 'Agent actions', value: 126973 },
  { label: 'Decisions logged', value: 1321 },
]

export function StatsTicker({ offset = 0 }: { offset?: number }) {
  const stats = [...STATS.slice(offset), ...STATS.slice(0, offset)]
  return (
    <div className="border-y border-border bg-background/60">
      <div className="mx-auto flex max-w-7xl items-center gap-6 overflow-x-auto px-4 py-4 no-scrollbar sm:px-6 lg:px-8">
        <span className="shrink-0 text-sm font-medium whitespace-nowrap text-foreground">
          {BRAND_NAME} in motion today
        </span>
        <span aria-hidden className="h-4 w-px shrink-0 bg-border" />
        <div className="flex items-center gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="flex shrink-0 items-center gap-2 whitespace-nowrap">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs tabular-nums text-foreground">
                <CountUp value={stat.value} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
