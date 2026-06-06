import type { AfpOption } from '../types'

interface RecextToolbarProps {
  afp: string
  afpOptions: AfpOption[]
  isLoading: boolean
  isError: boolean
  onAfpChange: (value: string) => void
}

function RecextToolbar({
  afp,
  afpOptions,
  isLoading,
  isError,
  onAfpChange,
}: RecextToolbarProps) {
  return (
    <div className="rounded-[1rem] bg-[var(--app-primary-soft)] p-2 shadow-[var(--shadow-sm)]">
      <div className="max-w-xl px-0.5 py-1.5">
        <span className="mb-2 block text-[1rem] font-medium text-[var(--app-primary)] sm:text-[1.1rem]">
          Seleccione AFP
        </span>
        <div className="relative border-b border-[var(--app-primary)] pb-1">
          <select
            value={afp}
            onChange={(event) => onAfpChange(event.target.value)}
            className={`w-full appearance-none bg-transparent pr-3.5 outline-none sm:text-[1.05rem] ${
              afp ? 'text-[var(--app-text)]' : 'text-[var(--app-text-muted)]'
            }`}
          >
            <option value="" disabled>
              {isLoading
                ? 'Cargando AFP...'
                : isError
                  ? 'No fue posible cargar AFP'
                  : 'Seleccione AFP a consultar'}
            </option>
            {afpOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-[0.8rem] text-[var(--app-text)]">
            ▼
          </span>
        </div>
      </div>
    </div>
  )
}

export default RecextToolbar
