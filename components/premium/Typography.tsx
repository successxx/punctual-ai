import { ReactNode, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

// Headline component with fluid type scale
interface HeadlineProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode
  level?: 1 | 2 | 3 | 4 | 5 | 6
  size?: 'display' | '3xl' | '2xl' | 'xl' | 'lg' | 'md' | 'base'
  weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold'
  tracking?: 'tight' | 'snug' | 'normal' | 'wide'
  align?: 'left' | 'center' | 'right'
  balance?: boolean
}

export function Headline({
  children,
  level = 1,
  size,
  weight = 'semibold',
  tracking = 'tight',
  align = 'left',
  balance = true,
  className,
  ...props
}: HeadlineProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements

  const sizeClasses = {
    display: 'text-[var(--fs-display)]',
    '3xl': 'text-[var(--fs-3xl)]',
    '2xl': 'text-[var(--fs-2xl)]',
    xl: 'text-[var(--fs-xl)]',
    lg: 'text-[var(--fs-lg)]',
    md: 'text-[var(--fs-md)]',
    base: 'text-[var(--fs-base)]'
  }

  const defaultSizes = {
    1: 'display',
    2: '2xl',
    3: 'xl',
    4: 'lg',
    5: 'md',
    6: 'base'
  } as const

  const weightClasses = {
    light: 'font-[var(--fw-light)]',
    regular: 'font-[var(--fw-regular)]',
    medium: 'font-[var(--fw-medium)]',
    semibold: 'font-[var(--fw-semibold)]',
    bold: 'font-[var(--fw-bold)]'
  }

  const trackingClasses = {
    tight: 'tracking-[var(--ls-tight)]',
    snug: 'tracking-[var(--ls-snug)]',
    normal: 'tracking-[var(--ls-normal)]',
    wide: 'tracking-[var(--ls-wide)]'
  }

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }

  const finalSize = size || defaultSizes[level]

  return (
    <Tag
      className={cn(
        'text-[var(--text-primary)]',
        'leading-[var(--lh-tight)]',
        sizeClasses[finalSize],
        weightClasses[weight],
        trackingClasses[tracking],
        alignClasses[align],
        balance && 'text-balance',
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}

// Eyebrow component for small labels above headlines
interface EyebrowProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: 'default' | 'accent' | 'muted'
}

export function Eyebrow({
  children,
  variant = 'default',
  className,
  ...props
}: EyebrowProps) {
  const variantClasses = {
    default: 'text-[var(--text-secondary)]',
    accent: 'text-[var(--brand-primary)]',
    muted: 'text-[var(--text-muted)]'
  }

  return (
    <div
      className={cn(
        'text-[var(--fs-xs)]',
        'font-[var(--fw-medium)]',
        'tracking-[var(--ls-wide)]',
        'uppercase',
        'mb-[var(--space-2)]',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Lead paragraph component
interface LeadProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode
  size?: 'default' | 'large'
}

export function Lead({
  children,
  size = 'default',
  className,
  ...props
}: LeadProps) {
  const sizeClasses = {
    default: 'text-[var(--fs-md)]',
    large: 'text-[var(--fs-lg)]'
  }

  return (
    <p
      className={cn(
        sizeClasses[size],
        'text-[var(--text-secondary)]',
        'leading-[var(--lh-relaxed)]',
        'max-w-[var(--container-prose)]',
        'mb-[var(--space-6)]',
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}

// Prose component for long-form content
interface ProseProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  size?: 'default' | 'small'
}

export function Prose({
  children,
  size = 'default',
  className,
  ...props
}: ProseProps) {
  const sizeClass = size === 'default' ? 'prose-base' : 'prose-sm'

  return (
    <div
      className={cn(
        'prose',
        sizeClass,
        'prose-gray',
        'max-w-[var(--container-prose)]',
        'prose-headings:font-[var(--fw-semibold)]',
        'prose-headings:tracking-[var(--ls-snug)]',
        'prose-p:text-[var(--text-primary)]',
        'prose-p:leading-[var(--lh-relaxed)]',
        'prose-a:text-[var(--brand-primary)]',
        'prose-a:no-underline',
        'prose-a:font-[var(--fw-medium)]',
        'hover:prose-a:underline',
        'prose-strong:font-[var(--fw-semibold)]',
        'prose-code:font-[var(--font-mono)]',
        'prose-code:text-[var(--fs-sm)]',
        'prose-code:bg-[var(--bg-tertiary)]',
        'prose-code:px-[var(--space-1)]',
        'prose-code:py-[0.125rem]',
        'prose-code:rounded-[var(--radius-xs)]',
        'prose-blockquote:border-l-[var(--brand-primary)]',
        'prose-blockquote:pl-[var(--space-4)]',
        'prose-blockquote:italic',
        'prose-ul:list-disc',
        'prose-ol:list-decimal',
        'prose-li:marker:text-[var(--text-tertiary)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}