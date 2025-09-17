import { ReactNode, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: 'default' | 'bordered' | 'elevated' | 'glass' | 'gradient'
  padding?: 'none' | 'tight' | 'default' | 'relaxed'
  hover?: boolean
}

export function Card({
  children,
  variant = 'default',
  padding = 'default',
  hover = false,
  className,
  ...props
}: CardProps) {
  const variantClasses = {
    default: 'bg-[var(--card-default-bg)]',
    bordered: 'bg-[var(--card-bordered-bg)] border border-[var(--border-default)]',
    elevated: 'bg-[var(--card-elevated-bg)] shadow-[var(--shadow-md)]',
    glass: cn(
      'bg-[var(--card-glass-bg)]',
      'backdrop-blur-xl backdrop-saturate-150',
      'border border-[var(--border-subtle)]'
    ),
    gradient: 'bg-[var(--card-gradient-bg)] shadow-[var(--shadow-md)]'
  }

  const paddingClasses = {
    none: '',
    tight: 'p-[var(--space-4)]',
    default: 'p-[var(--space-6)]',
    relaxed: 'p-[var(--space-8)]'
  }

  return (
    <div
      className={cn(
        'rounded-[var(--radius-lg)]',
        'transition-all duration-[var(--transition-base)]',
        variantClasses[variant],
        paddingClasses[padding],
        hover && cn(
          'hover:shadow-[var(--shadow-lg)]',
          'hover:translate-y-[-2px]',
          'cursor-pointer'
        ),
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function CardHeader({
  children,
  className,
  ...props
}: CardHeaderProps) {
  return (
    <div
      className={cn(
        'pb-[var(--space-4)]',
        'border-b border-[var(--border-default)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function CardBody({
  children,
  className,
  ...props
}: CardBodyProps) {
  return (
    <div
      className={cn(
        'py-[var(--space-4)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function CardFooter({
  children,
  className,
  ...props
}: CardFooterProps) {
  return (
    <div
      className={cn(
        'pt-[var(--space-4)]',
        'border-t border-[var(--border-default)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}