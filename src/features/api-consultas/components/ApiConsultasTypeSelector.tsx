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
    <div className="inline-flex flex-wrap rounded-[0.85rem] bg-[#111015] p-1">
      {options.map((option) => (
        <button
          className={`rounded-[0.65rem] px-3 py-1.5 text-[0.95rem] font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#02d3ff]/50 ${
            selectedType === option.value
              ? 'bg-[#f79b63] text-[#111015]'
              : 'text-[#96959a] hover:text-[#f3f1e9]'
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
