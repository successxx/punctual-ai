import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface DeckProps {
  children: ReactNode
  size?: 'normal' | 'large'
  className?: string
}

/**
 * Deck - Short preface or introductory paragraph
 * Typically follows the Display heading as a subtitle or introduction
 */
export function Deck({ children, size = 'normal', className }: DeckProps) {
  const sizeClasses = {
    normal: 'text-[var(--fs-m)] leading-[var(--lh-normal)]',
    large: 'text-[var(--fs-l)] leading-[var(--lh-normal)]'
  }

  return (
    <div
      className={cn(
        // Base styling
        'text-[var(--text-secondary)]',
        'measure-prose',
        'mb-[var(--baseline-4)]',
        // Size variant
        sizeClasses[size],
        className
      )}
    >
      {children}
    </div>
  )
}