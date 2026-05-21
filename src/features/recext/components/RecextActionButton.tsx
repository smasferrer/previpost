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
    ? 'bg-[#2c2c2c] text-[#3f3f3f]'
    : 'bg-[#f79b63] text-[#1c1c1c] transition hover:bg-[#ffad78] focus:outline-none focus:ring-2 focus:ring-[#02d3ff]/50'

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`w-full rounded-lg px-4 py-1.5 text-[1rem] font-semibold sm:w-[274px] ${buttonClassName}`}
    >
      {isLoading ? 'Consultando...' : 'Consultar'}
    </button>
  )
}

export default RecextActionButton
