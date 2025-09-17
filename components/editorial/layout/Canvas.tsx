import { ReactNode } from 'react'

interface CanvasProps {
  children: ReactNode
  width?: 'narrow' | 'standard' | 'wide' | 'full'
  className?: string
}

/**
 * Canvas - Page wrapper that sets baseline grid & container width
 * The foundational layout component for editorial pages
 */
export function Canvas({ children, width = 'standard', className }: CanvasProps) {
  const widthStyles = {
    narrow: { maxWidth: 'var(--container-s)' },
    standard: { maxWidth: 'var(--container-m)' },
    wide: { maxWidth: 'var(--container-l)' },
    full: { maxWidth: 'var(--container-xl)' }
  }

  return (
    <div
      className={className}
      style={{
        ...widthStyles[width],
        margin: '0 auto',
        padding: '0 var(--baseline-3)',
        backgroundColor: 'var(--color-paper)',
        color: 'var(--color-ink)',
        fontFamily: 'var(--font-body)',
        lineHeight: 'var(--lh-base)'
      }}
    >
      {children}
    </div>
  )
}