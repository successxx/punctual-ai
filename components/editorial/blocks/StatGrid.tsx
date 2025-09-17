import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface StatItemProps {
  label: string
  value: string | number
  icon?: ReactNode
  trend?: 'up' | 'down' | 'neutral'
  className?: string
}

interface StatGridProps {
  children: ReactNode
  columns?: 2 | 3 | 4
  className?: string
}

/**
 * StatItem - Individual statistic display
 * Clean, minimal presentation of key metrics
 */
export function StatItem({ label, value, icon, trend, className }: StatItemProps) {
  return (
    <div
      className={cn(
        'border border-[var(--color-editorial-gray-200)]',
        'p-[var(--baseline-4)]',
        'bg-[var(--bg-primary)]',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <div className="text-[var(--fs-xs)] text-[var(--text-secondary)] uppercase tracking-wider mb-[var(--baseline)]">
            {label}
          </div>
          <div className="text-[var(--fs-xl)] font-semibold text-[var(--text-primary)] leading-none">
            {value}
          </div>
        </div>
        {icon && (
          <div className="ml-[var(--baseline-2)] text-[var(--text-tertiary)] flex-shrink-0">
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * StatGrid - Grid container for statistics
 * Responsive grid that collapses on mobile
 */
export function StatGrid({ children, columns = 4, className }: StatGridProps) {
  const columnClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  }

  return (
    <div
      className={cn(
        'grid gap-[var(--baseline-3)]',
        columnClasses[columns],
        className
      )}
    >
      {children}
    </div>
  )
}