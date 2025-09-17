import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface DisplayProps {
  children: ReactNode
  level?: 1 | 2 | 3
  balance?: boolean
  className?: string
}

/**
 * Display - Primary headline typography
 * Always contains the page's main h1 or section headers
 */
export function Display({ children, level = 1, balance = true, className }: DisplayProps) {
  const levelClasses = {
    1: 'text-[var(--fs-xxl)] leading-[var(--lh-tight)] font-semibold',
    2: 'text-[var(--fs-xl)] leading-[var(--lh-tight)] font-semibold',
    3: 'text-[var(--fs-l)] leading-[var(--lh-tight)] font-medium'
  }

  const Tag = level === 1 ? 'h1' : level === 2 ? 'h2' : 'h3'

  return (
    <Tag
      className={cn(
        // Base typography
        'text-[var(--text-primary)]',
        'tracking-tight',
        'measure-narrow',
        // Level-specific sizing
        levelClasses[level],
        // Text balance for better line breaks
        balance && 'text-balance',
        // Baseline spacing
        'mb-[var(--baseline-3)]',
        className
      )}
    >
      {children}
    </Tag>
  )
}