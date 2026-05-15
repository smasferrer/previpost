interface RecextResponsePanelProps {
  data?: unknown
  errorMessage?: string | null
  isLoading: boolean
  statusLabel: string
}

const formatJson = (value: unknown) => {
  if (value === undefined || value === null) {
    return ''
  }

  try {
    return JSON.stringify(value, null, 2)
  } catch {
    return String(value)
  }
}

function RecextResponsePanel({
  data,
  errorMessage,
  isLoading,
  statusLabel,
}: RecextResponsePanelProps) {
  return (
    <aside className="rounded-[1.2rem] bg-[#25232d] p-4 shadow-[0_18px_38px_rgba(0,0,0,0.16)] sm:p-5">
      <div className="mb-4 rounded-[1rem] bg-[#19181f] px-6 py-5">
        <h3 className="mb-3 text-[1rem] font-semibold text-[#96959a] sm:text-[1.05rem]">
          Usuario
        </h3>
        <p className="text-[1rem] font-semibold text-[#96959a] sm:text-[1.05rem]">
          Ultimos registros:
        </p>
      </div>

      <div className="rounded-[1rem] bg-[#1b1a22] p-4">
        <div className="mb-4 rounded-[0.8rem] bg-[#111015] px-6 py-3 text-[1rem] text-[#96959a] sm:text-[1.05rem]">
          {statusLabel}
        </div>

        <div className="min-h-[435px] rounded-[0.95rem] bg-[#1b1a22] p-5 text-[0.95rem] text-[#96959a]">
          {isLoading ? 'Consultando backend...' : null}
          {!isLoading && errorMessage ? (
            <p className="text-[#f79b63]">{errorMessage}</p>
          ) : null}
          {!isLoading && !errorMessage && data !== undefined ? (
            <p>Consulta ejecutada correctamente.</p>
          ) : null}
        </div>

        <div className="mt-4 overflow-hidden rounded-[0.95rem] bg-[#111015]">
          <div className="border-b border-white/5 px-5 py-1.5 text-[0.9rem] font-semibold text-[#96959a]">
            Json
          </div>
          <pre className="min-h-[258px] overflow-auto bg-[#1b1a22] p-5 text-[0.85rem] leading-relaxed text-[#96959a]">
            {formatJson(data)}
          </pre>
        </div>
      </div>
    </aside>
  )
}

export default RecextResponsePanel
