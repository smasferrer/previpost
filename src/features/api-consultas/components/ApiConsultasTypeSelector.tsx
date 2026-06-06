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
    <div className="inline-flex flex-wrap border-b border-[var(--app-border)]">
      {options.map((option) => (
        <button
          className={`border-b-2 px-3 py-2 text-[0.95rem] font-semibold transition focus:outline-none focus:ring-2 focus:ring-[var(--app-focus-ring)] ${
            selectedType === option.value
              ? 'border-[var(--color-secondary)] text-[var(--color-secondary)]'
              : 'border-transparent text-[var(--app-tab-inactive)] hover:text-[var(--color-secondary-hover)]'
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
