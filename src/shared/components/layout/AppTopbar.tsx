import { useAfpContext } from '../../context/useAfpContext'
import { useThemeContext } from '../../theme/useThemeContext'
import AppSelect from '../ui/AppSelect'

function AppTopbar() {
  const { afp, afpOptions, isAfpError, isLoadingAfps, setAfp } = useAfpContext()
  const { setTheme, theme, themes } = useThemeContext()

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--color-border)] bg-[var(--color-background)]/95 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-12 w-full max-w-[1360px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-secondary)]">
            Herramienta QA
          </p>
          <p className="text-sm text-[var(--color-text-muted)]">
            Consultas operativas PreviPost
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-start">
          <div className="min-w-[210px]">
            <AppSelect
              label="Tema"
              onChange={(nextTheme) => setTheme(nextTheme as typeof theme)}
              options={themes.map((option) => ({
                label: option.label,
                value: option.id,
              }))}
              value={theme}
            />
          </div>

          <div className="min-w-[240px]">
            <AppSelect
              disabled={isLoadingAfps || isAfpError}
              errorMessage={isAfpError ? 'Reintenta recargando la pagina.' : null}
              label="AFP activa"
              onChange={setAfp}
              options={afpOptions.map((option) => ({
                label: option.label,
                value: option.value,
              }))}
              placeholder={
                isLoadingAfps
                  ? 'Cargando AFP...'
                  : isAfpError
                    ? 'No fue posible cargar AFP'
                    : 'Selecciona una AFP'
              }
              value={afp}
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default AppTopbar
