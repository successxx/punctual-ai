import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface LayoutProps {
  children: ReactNode
  className?: string
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <div className={cn('min-h-screen bg-[var(--bg-primary)]', className)}>
      {children}
    </div>
  )
}

interface NavigationProps {
  logo?: ReactNode
  className?: string
}

export function Navigation({ logo, className }: NavigationProps) {
  return (
    <nav className={cn(
      'fixed top-0 z-[var(--z-sticky)]',
      'w-full',
      'bg-[var(--bg-primary)]/80',
      'backdrop-blur-xl backdrop-saturate-150',
      'border-b border-[var(--border-default)]',
      className
    )}>
      <div className="max-w-[var(--container-xl)] mx-auto px-[var(--space-5)]">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            {logo || (
              <span className="text-[var(--fs-md)] font-[var(--fw-semibold)] tracking-[var(--ls-snug)]">
                punctual.ai
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}

interface MainProps {
  children: ReactNode
  className?: string
}

export function Main({ children, className }: MainProps) {
  return (
    <main className={cn('pt-16', className)}>
      {children}
    </main>
  )
}

interface ContainerProps {
  children: ReactNode
  size?: 'narrow' | 'default' | 'wide' | 'full'
  className?: string
}

export function Container({
  children,
  size = 'default',
  className
}: ContainerProps) {
  const sizeClasses = {
    narrow: 'max-w-[var(--container-prose)]',
    default: 'max-w-[var(--container-xl)]',
    wide: 'max-w-[var(--container-2xl)]',
    full: 'max-w-full'
  }

  return (
    <div className={cn(
      sizeClasses[size],
      'mx-auto',
      'px-[var(--space-5)]',
      className
    )}>
      {children}
    </div>
  )
}