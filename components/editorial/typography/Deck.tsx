import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface DeckProps {
  children: ReactNode
  size?: 'normal' | 'large'
  className?: string
  align?: string
  style?: React.CSSProperties
}

/**
 * Deck - Short preface or introductory paragraph
 * Typically follows the Display heading as a subtitle or introduction
 */
export function Deck({ children, size = 'normal', className, align, style }: DeckProps) {
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
        // Alignment
        align === 'center' && 'text-center mx-auto',
        className
      )}
      style={style}
    >
      {children}
    </div>
  )
}