import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface TabGroupProps {
  children: ReactNode
  className?: string
}

interface TabProps {
  children: ReactNode
  active?: boolean
  onClick?: () => void
  className?: string
}

/**
 * TabGroup - Editorial tab navigation
 * Clean, minimal tab interface following editorial design principles
 */
export function TabGroup({ children, className }: TabGroupProps) {
  return (
    <nav
      className={cn(
        'border-b border-[var(--color-editorial-gray-200)]',
        className
      )}
      role="tablist"
    >
      <div className="flex space-x-[var(--baseline-6)]">
        {children}
      </div>
    </nav>
  )
}

/**
 * Tab - Individual tab button
 * Minimal styling with clean focus states
 */
export function Tab({ children, active = false, onClick, className }: TabProps) {
  return (
    <button
      className={cn(
        'pb-[var(--baseline-2)] border-b-2',
        'text-[var(--fs-s)] font-medium',
        'transition-colors duration-[var(--transition-fast)]',
        'focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]',
        'focus-visible:outline-offset-[var(--focus-ring-offset)]',
        active
          ? 'border-[var(--color-editorial-accent)] text-[var(--color-editorial-accent)]'
          : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--color-editorial-gray-200)]',
        className
      )}
      onClick={onClick}
      role="tab"
      aria-selected={active}
    >
      {children}
    </button>
  )
}