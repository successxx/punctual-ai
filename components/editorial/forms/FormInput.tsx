import { InputHTMLAttributes } from 'react'

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  error?: string
  helper?: string
}

export function FormInput({ 
  id, 
  label, 
  error, 
  helper, 
  ...props 
}: FormInputProps) {
  return (
    <div>
      <label 
        htmlFor={id}
        style={{
          display: 'block',
          fontSize: 'var(--fs-xs)',
          fontWeight: '500',
          marginBottom: 'var(--baseline)',
          color: 'var(--color-ink)'
        }}
      >
        {label}
      </label>
      <input
        id={id}
        style={{
          width: '100%',
          padding: 'var(--baseline-1) var(--baseline-2)',
          border: '1px solid',
          borderColor: error ? 'red' : 'var(--color-rule)',
          borderRadius: 'var(--radius-micro)',
          fontSize: 'var(--fs-s)',
          backgroundColor: props.disabled ? 'var(--color-paper-shade)' : 'var(--color-paper)',
          color: 'var(--color-ink)',
          transition: 'border-color var(--transition-base)'
        }}
        {...props}
      />
      {error && (
        <p style={{
          fontSize: 'var(--fs-xs)',
          color: 'red',
          marginTop: 'var(--baseline)'
        }}>
          {error}
        </p>
      )}
      {helper && !error && (
        <p style={{
          fontSize: 'var(--fs-xs)',
          color: 'var(--color-ink-lighter)',
          marginTop: 'var(--baseline)'
        }}>
          {helper}
        </p>
      )}
    </div>
  )
}