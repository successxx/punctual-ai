import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'minimal'
  size?: 'small' | 'default' | 'large'
  fullWidth?: boolean
  href?: string
  external?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'default',
      fullWidth = false,
      href,
      external,
      icon,
      iconPosition = 'right',
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      primary: cn(
        'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]',
        'hover:bg-[var(--btn-primary-hover)]',
        'active:bg-[var(--btn-primary-active)]',
        'disabled:opacity-50'
      ),
      secondary: cn(
        'bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)]',
        'border border-[var(--btn-secondary-border)]',
        'hover:bg-[var(--btn-secondary-hover-bg)]',
        'active:bg-[var(--btn-secondary-active-bg)]',
        'disabled:opacity-50'
      ),
      ghost: cn(
        'bg-[var(--btn-ghost-bg)] text-[var(--btn-ghost-text)]',
        'hover:bg-[var(--btn-ghost-hover-bg)]',
        'active:bg-[var(--btn-ghost-active-bg)]',
        'disabled:opacity-50'
      ),
      minimal: cn(
        'bg-transparent text-[var(--text-secondary)]',
        'hover:text-[var(--text-primary)]',
        'underline-offset-4 hover:underline',
        'disabled:opacity-50'
      )
    }

    const sizeClasses = {
      small: cn(
        'text-[var(--fs-xs)]',
        'px-[var(--space-3)] py-[var(--space-2)]',
        'gap-[var(--space-1)]'
      ),
      default: cn(
        'text-[var(--fs-sm)]',
        'px-[var(--space-4)] py-[var(--space-3)]',
        'gap-[var(--space-2)]'
      ),
      large: cn(
        'text-[var(--fs-base)]',
        'px-[var(--space-5)] py-[var(--space-4)]',
        'gap-[var(--space-2)]'
      )
    }

    const baseClasses = cn(
      'inline-flex items-center justify-center',
      'font-[var(--fw-medium)]',
      'rounded-[var(--radius-md)]',
      'transition-all duration-[var(--transition-base)]',
      'focus-visible:outline focus-visible:outline-2',
      'focus-visible:outline-offset-2',
      'focus-visible:outline-[var(--focus-ring-color)]',
      'disabled:cursor-not-allowed',
      fullWidth && 'w-full'
    )

    const buttonClasses = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      className
    )

    const content = (
      <>
        {icon && iconPosition === 'left' && (
          <span className="inline-flex shrink-0">{icon}</span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <span className="inline-flex shrink-0">{icon}</span>
        )}
      </>
    )

    if (href) {
      const Component = external ? 'a' : Link
      const linkProps = external
        ? { href, target: '_blank', rel: 'noopener noreferrer' }
        : { href }

      return (
        <Component
          {...linkProps}
          className={buttonClasses}
          aria-disabled={disabled}
        >
          {content}
        </Component>
      )
    }

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled}
        {...props}
      >
        {content}
      </button>
    )
  }
)

Button.displayName = 'Button'