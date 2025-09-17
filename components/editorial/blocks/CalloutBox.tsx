import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CalloutBoxProps {
  children: ReactNode
  tone?: 'info' | 'success' | 'warn' | 'neutral'
  title?: string
  className?: string
}

/**
 * CalloutBox - Editorial callout with vertical rule
 * Used for highlighting important information, tips, or warnings
 */
export function CalloutBox({ children, tone = 'neutral', title, className }: CalloutBoxProps) {
  const toneClasses = {
    info: 'border-l-[var(--color-editorial-accent)] bg-blue-50 text-blue-900',
    success: 'border-l-green-600 bg-green-50 text-green-900',
    warn: 'border-l-amber-600 bg-amber-50 text-amber-900',
    neutral: 'border-l-[var(--color-editorial-gray-400)] bg-[var(--bg-secondary)] text-[var(--text-primary)]'
  }

  return (
    <aside
      className={cn(
        'border-l-2 pl-[var(--baseline-3)] py-[var(--baseline-2)]',
        'my-[var(--baseline-4)]',
        toneClasses[tone],
        className
      )}
      role="note"
      aria-label={title || 'Callout'}
    >
      {title && (
        <div className="font-semibold text-[var(--fs-s)] mb-[var(--baseline-2)]">
          {title}
        </div>
      )}
      <div className="text-[var(--fs-s)] leading-[var(--lh-normal)]">
        {children}
      </div>
    </aside>
  )
}