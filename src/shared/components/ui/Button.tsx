import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  loadingLabel?: string
  variant?: ButtonVariant
}

const variantClassNames: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-primary)] text-[var(--color-primary-contrast)] hover:bg-[var(--color-primary-hover)] focus:ring-[var(--color-secondary)]',
  secondary:
    'border border-[var(--color-border-strong)] bg-[var(--color-surface-muted)] text-[var(--color-text-primary)] hover:border-[var(--color-secondary)] hover:text-[var(--color-secondary)] focus:ring-[var(--color-secondary)]',
  ghost:
    'bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text-primary)] focus:ring-[var(--color-secondary)]',
  danger:
    'bg-[var(--color-error)] text-[var(--color-text-inverse)] hover:brightness-110 focus:ring-[var(--color-error)]',
}

function Button({
  children,
  className = '',
  disabled,
  isLoading = false,
  loadingLabel = 'Cargando...',
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading
  const content: ReactNode = isLoading ? loadingLabel : children

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`inline-flex items-center justify-center rounded-[var(--radius-md)] px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${variantClassNames[variant]} ${className}`}
      {...props}
    >
      {content}
    </button>
  )
}

export default Button
