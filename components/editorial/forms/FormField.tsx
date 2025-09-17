import { ReactNode, InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  helper?: string
  children?: ReactNode
}

/**
 * FormField - Editorial form field with proper spacing and typography
 * Follows editorial design principles with clean, accessible styling
 */
export function FormField({
  label,
  error,
  helper,
  className,
  children,
  ...props
}: FormFieldProps) {
  return (
    <div className="space-y-[var(--baseline)]">
      <label
        htmlFor={props.id}
        className="block text-[var(--fs-s)] font-medium text-[var(--text-primary)]"
      >
        {label}
      </label>

      {children || (
        <input
          className={cn(
            'w-full px-[var(--baseline-2)] py-[var(--baseline-2)]',
            'border border-[var(--color-editorial-gray-200)]',
            'text-[var(--fs-s)] text-[var(--text-primary)]',
            'placeholder:text-[var(--text-tertiary)]',
            'focus:outline-none focus:ring-[var(--focus-ring-width)] focus:ring-[var(--focus-ring-color)]',
            'focus:border-[var(--color-editorial-accent)]',
            'transition-colors duration-[var(--transition-fast)]',
            'disabled:bg-[var(--bg-secondary)] disabled:cursor-not-allowed',
            error && 'border-red-500',
            className
          )}
          {...props}
        />
      )}

      {error && (
        <p className="text-[var(--fs-xs)] text-red-600" role="alert">
          {error}
        </p>
      )}

      {helper && !error && (
        <p className="text-[var(--fs-xs)] text-[var(--text-tertiary)]">
          {helper}
        </p>
      )}
    </div>
  )
}