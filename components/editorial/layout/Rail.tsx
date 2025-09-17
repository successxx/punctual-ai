import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface RailProps {
  children: ReactNode
  sidebar: ReactNode
  sidebarPosition?: 'left' | 'right'
  sidebarWidth?: 'narrow' | 'standard'
  gap?: 'normal' | 'wide'
  className?: string
}

/**
 * Rail - Two-column layout with narrow sidebar rail
 * Perfect for TOC, meta info, CTAs alongside main content
 */
export function Rail({
  children,
  sidebar,
  sidebarPosition = 'right',
  sidebarWidth = 'standard',
  gap = 'normal',
  className
}: RailProps) {
  const sidebarWidthClasses = {
    narrow: 'lg:w-[16rem]',
    standard: 'lg:w-[var(--rail-width)]'
  }

  const gapClasses = {
    normal: 'gap-[var(--baseline-6)]',
    wide: 'gap-[var(--baseline-8)]'
  }

  const mainContent = (
    <main className="min-w-0 flex-1">
      {children}
    </main>
  )

  const sidebarContent = (
    <aside
      className={cn(
        'lg:flex-shrink-0',
        sidebarWidthClasses[sidebarWidth]
      )}
    >
      {sidebar}
    </aside>
  )

  return (
    <div
      className={cn(
        'flex flex-col lg:flex-row',
        gapClasses[gap],
        className
      )}
    >
      {sidebarPosition === 'left' ? (
        <>
          {sidebarContent}
          {mainContent}
        </>
      ) : (
        <>
          {mainContent}
          {sidebarContent}
        </>
      )}
    </div>
  )
}