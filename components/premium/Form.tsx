import { InputHTMLAttributes, LabelHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

// Form Field Container
interface FormFieldProps {
  children: React.ReactNode
  className?: string
}

export function FormField({ children, className }: FormFieldProps) {
  return (
    <div className={cn('space-y-[var(--space-2)]', className)}>
      {children}
    </div>
  )
}

// Label Component
interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

export function Label({
  children,
  required,
  className,
  ...props
}: LabelProps) {
  return (
    <label
      className={cn(
        'block',
        'text-[var(--fs-sm)]',
        'font-[var(--fw-medium)]',
        'text-[var(--text-primary)]',
        'mb-[var(--space-2)]',
        className
      )}
      {...props}
    >
      {children}
      {required && (
        <span className="text-[var(--color-error)] ml-1" aria-label="required">
          *
        </span>
      )}
    </label>
  )
}

// Input Component
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <>
        <input
          ref={ref}
          className={cn(
            'w-full',
            'px-[var(--space-4)]',
            'py-[var(--space-3)]',
            'text-[var(--fs-base)]',
            'text-[var(--field-text)]',
            'bg-[var(--field-bg)]',
            'border border-[var(--field-border)]',
            'rounded-[var(--radius-md)]',
            'transition-all duration-[var(--transition-base)]',
            'placeholder:text-[var(--field-placeholder)]',
            'hover:border-[var(--border-strong)]',
            'focus:border-[var(--field-focus-border)]',
            'focus:outline-none',
            'focus:ring-2',
            'focus:ring-[var(--brand-primary)]/20',
            'disabled:opacity-50',
            'disabled:cursor-not-allowed',
            error && 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]/20',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-[var(--space-1)] text-[var(--fs-xs)] text-[var(--color-error)]">
            {error}
          </p>
        )}
      </>
    )
  }
)

Input.displayName = 'Input'

// Helper Text Component
interface HelperTextProps {
  children: React.ReactNode
  className?: string
}

export function HelperText({ children, className }: HelperTextProps) {
  return (
    <p className={cn(
      'text-[var(--fs-xs)]',
      'text-[var(--text-tertiary)]',
      'mt-[var(--space-1)]',
      className
    )}>
      {children}
    </p>
  )
}