interface RecextActionButtonProps {
  disabled: boolean
  isLoading: boolean
  onClick: () => void
}

function RecextActionButton({
  disabled,
  isLoading,
  onClick,
}: RecextActionButtonProps) {
  const buttonClassName = disabled
    ? 'bg-[var(--app-surface-muted)] text-[var(--app-text-muted)]'
    : 'bg-[var(--app-primary)] text-[var(--app-primary-contrast)] transition hover:bg-[var(--app-primary-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--app-focus-ring)]'

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`w-full rounded-[var(--radius-sm)] px-4 py-1.5 text-[1rem] font-semibold sm:w-[274px] ${buttonClassName}`}
    >
      {isLoading ? 'Consultando...' : 'Consultar'}
    </button>
  )
}

export default RecextActionButton
