import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: ReactNode
  width?: 'narrow' | 'default' | 'wide' | 'full'
  spacing?: 'tight' | 'default' | 'relaxed' | 'spacious'
  background?: 'primary' | 'secondary' | 'tertiary' | 'inverse'
  className?: string
  as?: 'section' | 'article' | 'div'
  id?: string
}

export function Section({
  children,
  width = 'default',
  spacing = 'default',
  background = 'primary',
  className,
  as: Component = 'section',
  id
}: SectionProps) {
  const widthClasses = {
    narrow: 'max-w-[var(--container-prose)] mx-auto px-[var(--space-4)]',
    default: 'max-w-[var(--container-xl)] mx-auto px-[var(--space-5)]',
    wide: 'max-w-[var(--container-2xl)] mx-auto px-[var(--space-5)]',
    full: 'w-full px-[var(--space-5)]'
  }

  const spacingClasses = {
    tight: 'py-[var(--space-6)]',
    default: 'py-[var(--space-8)]',
    relaxed: 'py-[var(--space-9)]',
    spacious: 'py-[var(--space-10)]'
  }

  const backgroundClasses = {
    primary: 'bg-[var(--bg-primary)]',
    secondary: 'bg-[var(--bg-secondary)]',
    tertiary: 'bg-[var(--bg-tertiary)]',
    inverse: 'bg-[var(--bg-inverse)] text-[var(--text-inverse)]'
  }

  return (
    <Component
      id={id}
      className={cn(
        backgroundClasses[background],
        spacingClasses[spacing],
        className
      )}
    >
      <div className={widthClasses[width]}>
        {children}
      </div>
    </Component>
  )
}