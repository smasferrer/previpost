import type { AfpOption } from '../types'

interface RecextToolbarProps {
  afp: string
  afpOptions: AfpOption[]
  isLoading: boolean
  isError: boolean
  onAfpChange: (value: string) => void
  onSelectApiConsultas: () => void
}

function RecextToolbar({
  afp,
  afpOptions,
  isLoading,
  isError,
  onAfpChange,
  onSelectApiConsultas,
}: RecextToolbarProps) {
  return (
    <div className="grid gap-4 rounded-[1.25rem] bg-[#281b12] p-2 shadow-[0_12px_30px_rgba(0,0,0,0.14)] sm:grid-cols-2">
      <div className="rounded-[0.9rem] border border-[#f79b63] bg-[#4b2a17] px-2 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <span className="mb-2 block text-[1rem] font-medium text-[#f79b63] sm:text-[1.1rem]">
          Consulta seleccionada
        </span>
        <div className="relative border-b border-[#f79b63] pb-1">
          <select
            value="recext"
            onChange={(event) => {
              if (event.target.value === 'api') {
                onSelectApiConsultas()
              }
            }}
            className="w-full appearance-none bg-transparent pr-3.5 text-[1rem] text-[#f3f1e9] outline-none sm:text-[1.05rem]"
          >
            <option value="recext">Consulta Rec. Externa</option>
            <option value="api">API Consultas</option>
          </select>
          <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-[0.8rem] text-[#f3f1e9]">
            ▼
          </span>
        </div>
      </div>

      <div className="px-0.5 py-1.5">
        <span className="mb-2 block text-[1rem] font-medium text-[#f79b63] sm:text-[1.1rem]">
          Seleccione AFP
        </span>
        <div className="relative border-b border-[#f79b63] pb-1">
          <select
            value={afp}
            onChange={(event) => onAfpChange(event.target.value)}
            className={`w-full appearance-none bg-transparent pr-3.5 outline-none sm:text-[1.05rem] ${
              afp ? 'text-[#f3f1e9]' : 'text-[#6a666f]'
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
          <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-[0.8rem] text-[#f3f1e9]">
            ▼
          </span>
        </div>
      </div>
    </div>
  )
}

export default RecextToolbar
