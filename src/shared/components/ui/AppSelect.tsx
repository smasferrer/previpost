import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'

export interface AppSelectOption<TValue extends string = string> {
  label: string
  value: TValue
}

interface AppSelectProps<TValue extends string = string> {
  disabled?: boolean
  errorMessage?: string | null
  label: string
  onChange: (value: TValue) => void
  options: AppSelectOption<TValue>[]
  placeholder?: string
  value: TValue | ''
}

function AppSelect<TValue extends string = string>({
  disabled = false,
  errorMessage,
  label,
  onChange,
  options,
  placeholder = 'Selecciona una opción',
  value,
}: AppSelectProps<TValue>) {
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const listboxId = useId()
  const selectedOption = options.find((option) => option.value === value)
  const visibleLabel = selectedOption?.label ?? placeholder

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const handleButtonKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setIsOpen(true)
    }
  }

  const handleSelect = (nextValue: TValue) => {
    onChange(nextValue)
    setIsOpen(false)
  }

  return (
    <div className="relative min-w-0 text-sm" ref={rootRef}>
      <span className="mb-1 block text-xs font-semibold text-[var(--app-primary)]">
        {label}
      </span>

      <button
        aria-controls={isOpen ? listboxId : undefined}
        aria-expanded={isOpen}
        className={`flex w-full min-w-0 items-center justify-between gap-3 rounded-[var(--radius-sm)] border px-3 py-2 text-left transition focus:outline-none focus:ring-2 ${
          disabled
            ? 'cursor-not-allowed border-[var(--app-border)] bg-[var(--app-surface-muted)] text-[var(--app-text-muted)] opacity-70'
            : isOpen
              ? 'border-[var(--app-primary)] bg-[var(--app-surface)] text-[var(--app-text)] shadow-[var(--shadow-sm)] focus:ring-[var(--app-focus-ring)]'
              : 'border-[var(--app-input-border)] bg-[var(--app-input-bg)] text-[var(--app-text)] hover:border-[var(--app-border-strong)] focus:ring-[var(--app-focus-ring)]'
        }`}
        disabled={disabled}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        onKeyDown={handleButtonKeyDown}
        type="button"
      >
        <span
          className={`min-w-0 truncate ${
            selectedOption ? 'text-[var(--app-input-text)]' : 'text-[var(--app-input-placeholder)]'
          }`}
        >
          {visibleLabel}
        </span>
        <span
          aria-hidden="true"
          className={`shrink-0 text-[0.72rem] text-[var(--app-text-muted)] transition ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          ▼
        </span>
      </button>

      {isOpen ? (
        <div
          className="absolute right-0 z-40 mt-2 max-h-72 w-full min-w-[220px] overflow-auto rounded-[var(--radius-sm)] border border-[var(--app-border-strong)] bg-[var(--app-surface)] p-1 shadow-[var(--shadow-md)]"
          id={listboxId}
          role="listbox"
        >
          {options.map((option) => {
            const isSelected = option.value === value

            return (
              <button
                aria-selected={isSelected}
                className={`flex w-full items-center justify-between gap-3 rounded-[var(--radius-sm)] px-3 py-2 text-left text-sm transition focus:outline-none focus:ring-2 focus:ring-[var(--app-focus-ring)] ${
                  isSelected
                    ? 'bg-[var(--app-primary-soft)] text-[var(--app-primary)]'
                    : 'text-[var(--app-text)] hover:bg-[var(--app-surface-muted)]'
                }`}
                key={option.value}
                onClick={() => handleSelect(option.value)}
                role="option"
                type="button"
              >
                <span className="min-w-0 truncate">{option.label}</span>
                {isSelected ? <span className="shrink-0 text-xs">Activo</span> : null}
              </button>
            )
          })}
        </div>
      ) : null}

      {errorMessage ? (
        <p className="mt-1 text-xs text-[var(--app-error)]">{errorMessage}</p>
      ) : null}
    </div>
  )
}

export default AppSelect
