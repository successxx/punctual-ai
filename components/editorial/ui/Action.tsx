import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface BaseActionProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'small' | 'medium' | 'large'
  className?: string
}

type ActionAsButtonProps = BaseActionProps & ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: never
}

type ActionAsLinkProps = BaseActionProps & AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
}

type ActionProps = ActionAsButtonProps | ActionAsLinkProps

/**
 * Action - Editorial button/link component
 * Link-looking button with clean, typographic styling
 */
export function Action({ children, variant = 'primary', size = 'medium', className, ...props }: ActionProps) {
  const variantClasses = {
    primary: 'bg-[var(--color-editorial-accent)] text-white hover:bg-[var(--color-editorial-accent-dark)]',
    secondary: 'border border-[var(--color-editorial-accent)] text-[var(--color-editorial-accent)] hover:bg-[var(--color-editorial-accent)] hover:text-white',
    ghost: 'text-[var(--color-editorial-accent)] hover:bg-[var(--bg-secondary)]'
  }

  const sizeClasses = {
    small: 'px-[var(--baseline-2)] py-[var(--baseline)] text-[var(--fs-xs)]',
    medium: 'px-[var(--baseline-3)] py-[var(--baseline-2)] text-[var(--fs-s)]',
    large: 'px-[var(--baseline-4)] py-[var(--baseline-3)] text-[var(--fs-m)]'
  }

  const baseClasses = cn(
    'inline-flex items-center justify-center',
    'font-medium leading-none',
    'transition-all duration-[var(--transition-fast)]',
    'focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)] focus-visible:outline-offset-[var(--focus-ring-offset)]',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    variantClasses[variant],
    sizeClasses[size],
    className
  )

  if ('href' in props && props.href) {
    const { href, ...linkProps } = props
    return (
      <Link href={href} className={baseClasses} {...linkProps}>
        {children}
      </Link>
    )
  }

  return (
    <button className={baseClasses} {...props as ButtonHTMLAttributes<HTMLButtonElement>}>
      {children}
    </button>
  )
}