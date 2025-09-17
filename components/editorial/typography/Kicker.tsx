import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface KickerProps {
  children: ReactNode
  variant?: 'default' | 'accent'
  transform?: 'uppercase' | 'small-caps' | 'none'
  className?: string
}

/**
 * Kicker - Editorial overline/eyebrow text
 * Used for section labels, categories, and introductory text
 */
export function Kicker({
  children,
  variant = 'default',
  transform = 'uppercase',
  className
}: KickerProps) {
  const variantClasses = {
    default: 'text-[var(--text-secondary)]',
    accent: 'text-[var(--text-accent)]'
  }

  const transformClasses = {
    uppercase: 'uppercase tracking-wider',
    'small-caps': 'font-variant-caps-all-small-caps tracking-wide',
    none: ''
  }

  return (
    <div
      className={cn(
        // Base styling
        'text-[var(--fs-xs)]',
        'font-medium',
        'mb-[var(--baseline-2)]',
        // Variant
        variantClasses[variant],
        // Text transform
        transformClasses[transform],
        className
      )}
    >
      {children}
    </div>
  )
}