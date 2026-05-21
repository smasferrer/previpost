import type { TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
  label?: string
}

function Textarea({
  className = '',
  error,
  id,
  label,
  ...props
}: TextareaProps) {
  return (
    <label className="block text-sm font-semibold text-[var(--color-text-secondary)]">
      {label ? <span className="mb-1 block">{label}</span> : null}
      <textarea
        id={id}
        className={`min-h-32 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-strong)] px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none transition placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-secondary)] focus:ring-2 focus:ring-[var(--color-secondary)]/25 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
        {...props}
      />
      {error ? (
        <span className="mt-1 block text-xs font-medium text-[var(--color-error)]">
          {error}
        </span>
      ) : null}
    </label>
  )
}

export default Textarea
