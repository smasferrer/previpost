import type { RecextFieldConfig } from '../formFields'
import type { RecextConsultationFormValues, SelectOption } from '../types'

interface RecextInputFieldProps extends RecextFieldConfig {
  fullWidth?: boolean
  options?: SelectOption[]
  value: string
  error?: string
  onChange: (name: keyof RecextConsultationFormValues, value: string) => void
}

function RecextInputField({
  name,
  label,
  placeholder,
  type = 'text',
  fullWidth = false,
  clearable = false,
  options = [],
  value,
  error,
  onChange,
}: RecextInputFieldProps) {
  const labelColorClassName = error
    ? 'text-[var(--app-error)]'
    : value.trim()
      ? 'text-[var(--app-text)]'
      : 'text-[var(--app-text-secondary)]'
  const borderClassName = error
    ? 'border-[var(--app-error)]'
    : 'border-[var(--app-primary)]'
  const optionClassName =
    'bg-[var(--app-input-bg)] text-[var(--app-input-text)]'

  if (type === 'select') {
    return (
      <label className={fullWidth ? 'lg:col-span-3' : undefined}>
        <span
          className={`mb-2 block text-[13px] font-medium ${labelColorClassName}`}
        >
          {label}
        </span>
        <div className={`relative border-b ${borderClassName} pb-1`}>
          <select
            value={value}
            onChange={(event) => onChange(name, event.target.value)}
            className="w-full appearance-none bg-transparent pr-3.5 text-[1rem] italic text-[var(--app-input-text)] outline-none sm:text-[1.05rem]"
          >
            <option
              className={optionClassName}
              value=""
              disabled={!clearable}
            >
              {placeholder}
            </option>
            {value && !options.some((option) => option.value === value) ? (
              <option className={optionClassName} value={value}>
                {value}
              </option>
            ) : null}
            {options.map((option) => (
              <option
                className={optionClassName}
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-1 top-1/2 h-2.5 w-2.5 -translate-y-2/3 rotate-45 border-b-2 border-r-2 border-[var(--app-primary)]"
          />
        </div>
      </label>
    )
  }

  return (
    <label className={fullWidth ? 'lg:col-span-3' : undefined}>
      <span
        className={`mb-2 block text-[13px] font-medium ${labelColorClassName}`}
      >
        {label}
      </span>
      <div className={`border-b ${borderClassName} pb-1`}>
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(name, event.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-[1rem] italic text-[var(--app-input-text)] outline-none placeholder:text-[var(--app-input-placeholder)] sm:text-[1.05rem]"
        />
      </div>
      {error ? (
        <p className="mt-1 text-[0.8rem] text-[var(--app-error)]">{error}</p>
      ) : null}
    </label>
  )
}

export default RecextInputField
