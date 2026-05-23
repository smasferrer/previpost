import type { ApiConsultasType } from '../types'

interface ApiConsultasTypeSelectorProps {
  selectedType: ApiConsultasType
  onSelectType: (type: ApiConsultasType) => void
}

const options: Array<{ label: string; value: ApiConsultasType }> = [
  { value: 'rut', label: 'Por RUT' },
  { value: 'transacciones-dia', label: 'Transacciones por día' },
  { value: 'token', label: 'Por token' },
]

function ApiConsultasTypeSelector({
  selectedType,
  onSelectType,
}: ApiConsultasTypeSelectorProps) {
  return (
    <div className="inline-flex flex-wrap rounded-[var(--radius-md)] bg-[var(--app-panel)] p-1">
      {options.map((option) => (
        <button
          className={`rounded-[var(--radius-sm)] px-3 py-1.5 text-[0.95rem] font-semibold transition focus:outline-none focus:ring-2 focus:ring-[var(--app-focus-ring)] ${
            selectedType === option.value
              ? 'bg-[var(--app-primary)] text-[var(--app-primary-contrast)]'
              : 'text-[var(--app-text-muted)] hover:text-[var(--app-text)]'
          }`}
          key={option.value}
          onClick={() => onSelectType(option.value)}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default ApiConsultasTypeSelector
