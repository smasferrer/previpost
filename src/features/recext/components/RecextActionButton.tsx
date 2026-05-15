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
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="w-full rounded-lg bg-[#2c2c2c] px-8 py-3 text-[1rem] font-semibold text-[#3f3f3f] sm:w-[274px]"
    >
      {isLoading ? 'Consultando...' : 'Consultar'}
    </button>
  )
}

export default RecextActionButton
