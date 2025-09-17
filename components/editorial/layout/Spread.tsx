import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SpreadProps {
  children: ReactNode
  secondary?: ReactNode
  ratio?: '3/9' | '4/8' | '5/7' | '6/6'
  alignment?: 'top' | 'center' | 'bottom'
  gap?: 'normal' | 'wide'
  reverseOnMobile?: boolean
  className?: string
}

/**
 * Spread - Asymmetric grid layout with responsive collapse
 * Creates editorial layouts with primary/secondary content areas
 */
export function Spread({
  children,
  secondary,
  ratio = '5/7',
  alignment = 'top',
  gap = 'normal',
  reverseOnMobile = false,
  className
}: SpreadProps) {
  const ratioClasses = {
    '3/9': 'lg:grid-cols-[3fr_9fr]',
    '4/8': 'lg:grid-cols-[4fr_8fr]',
    '5/7': 'lg:grid-cols-[5fr_7fr]',
    '6/6': 'lg:grid-cols-[6fr_6fr]'
  }

  const alignmentClasses = {
    top: 'items-start',
    center: 'items-center',
    bottom: 'items-end'
  }

  const gapClasses = {
    normal: 'gap-[var(--baseline-6)]',
    wide: 'gap-[var(--baseline-8)]'
  }

  return (
    <div
      className={cn(
        'grid grid-cols-1',
        ratioClasses[ratio],
        alignmentClasses[alignment],
        gapClasses[gap],
        reverseOnMobile && 'flex flex-col-reverse lg:grid',
        className
      )}
    >
      <div className="min-w-0">
        {children}
      </div>
      {secondary && (
        <div className="min-w-0">
          {secondary}
        </div>
      )}
    </div>
  )
}