import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface DataListProps {
  children: ReactNode
  title?: string
  emptyState?: ReactNode
  className?: string
}

interface DataListItemProps {
  children: ReactNode
  action?: ReactNode
  className?: string
}

/**
 * DataList - Editorial list for displaying structured data
 * Used for booking lists, user data, etc.
 */
export function DataList({ children, title, emptyState, className }: DataListProps) {
  return (
    <div
      className={cn(
        'border border-[var(--color-editorial-gray-200)]',
        'bg-[var(--bg-primary)]',
        className
      )}
    >
      {title && (
        <div className="border-b border-[var(--color-editorial-gray-200)] p-[var(--baseline-4)]">
          <h2 className="text-[var(--fs-m)] font-semibold text-[var(--text-primary)]">
            {title}
          </h2>
        </div>
      )}

      <div className="divide-y divide-[var(--color-editorial-gray-200)]">
        {children}
      </div>

      {emptyState && (
        <div className="p-[var(--baseline-6)] text-center">
          {emptyState}
        </div>
      )}
    </div>
  )
}

/**
 * DataListItem - Individual item in a data list
 * Provides consistent spacing and hover states
 */
export function DataListItem({ children, action, className }: DataListItemProps) {
  return (
    <div
      className={cn(
        'p-[var(--baseline-4)]',
        'hover:bg-[var(--bg-secondary)]',
        'transition-colors duration-[var(--transition-fast)]',
        className
      )}
    >
      <div className="flex items-start justify-between gap-[var(--baseline-3)]">
        <div className="min-w-0 flex-1">
          {children}
        </div>
        {action && (
          <div className="flex-shrink-0">
            {action}
          </div>
        )}
      </div>
    </div>
  )
}