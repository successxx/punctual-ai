import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface InlineCTAProps {
  children: ReactNode
  href: string
  className?: string
}

/**
 * InlineCTA - Inline call-to-action link with arrow glyph
 * Used for secondary actions and navigation prompts
 */
export function InlineCTA({ children, href, className }: InlineCTAProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-1',
        'text-[var(--fs-s)] text-[var(--text-accent)]',
        'underline underline-offset-2',
        'hover:underline-offset-4',
        'transition-all duration-[var(--transition-fast)]',
        'focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]',
        'focus-visible:outline-offset-[var(--focus-ring-offset)]',
        className
      )}
    >
      {children}
      <span className="text-[0.75em]" aria-hidden="true">→</span>
    </Link>
  )
}