import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface StripProps {
  children: ReactNode
  variant?: 'default' | 'accent' | 'inverse'
  rules?: 'none' | 'top' | 'bottom' | 'both'
  spacing?: 'tight' | 'normal' | 'loose'
  sticky?: boolean
  className?: string
}

/**
 * Strip - Full-bleed bands with optional hairline rules
 * Used for sectioning content with visual separation
 */
export function Strip({
  children,
  variant = 'default',
  rules = 'none',
  spacing = 'normal',
  sticky = false,
  className
}: StripProps) {
  const variantClasses = {
    default: 'bg-[var(--bg-primary)] text-[var(--text-primary)]',
    accent: 'bg-[var(--bg-secondary)] text-[var(--text-primary)]',
    inverse: 'bg-[var(--bg-inverse)] text-[var(--text-inverse)]'
  }

  const spacingClasses = {
    tight: 'py-[var(--baseline-4)]',
    normal: 'py-[var(--baseline-6)]',
    loose: 'py-[var(--baseline-8)]'
  }

  const ruleClasses = {
    none: '',
    top: 'border-t rule-hairline',
    bottom: 'border-b rule-hairline',
    both: 'border-y rule-hairline'
  }

  return (
    <section
      className={cn(
        // Base styling
        'w-full',
        // Variant
        variantClasses[variant],
        // Spacing
        spacingClasses[spacing],
        // Rules
        ruleClasses[rules],
        // Sticky positioning
        sticky && 'sticky top-0 z-[var(--z-sticky)]',
        className
      )}
    >
      {children}
    </section>
  )
}