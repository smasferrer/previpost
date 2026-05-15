import type { RecextFieldConfig } from '../formFields'
import type { RecextConsultationFormValues, SelectOption } from '../types'

interface RecextInputFieldProps extends RecextFieldConfig {
  fullWidth?: boolean
  options?: SelectOption[]
  value: string
  onChange: (name: keyof RecextConsultationFormValues, value: string) => void
}

function RecextInputField({
  name,
  label,
  placeholder,
  type = 'text',
  fullWidth = false,
  options = [],
  value,
  onChange,
}: RecextInputFieldProps) {
  if (type === 'select') {
    return (
      <label className={fullWidth ? 'lg:col-span-3' : undefined}>
        <span className="mb-2 block text-[1.1rem] font-medium text-[#f79b63] sm:text-[1.2rem]">
          {label}
        </span>
        <div className="relative border-b border-[#f79b63] pb-2">
          <select
            value={value}
            onChange={(event) => onChange(name, event.target.value)}
            className="w-full appearance-none bg-transparent pr-7 text-[1rem] italic text-[#6a666f] outline-none sm:text-[1.05rem]"
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {value && !options.some((option) => option.value === value) ? (
              <option value={value}>{value}</option>
            ) : null}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-[0.8rem] text-[#f3f1e9]">
            ▼
          </span>
        </div>
      </label>
    )
  }

  return (
    <label className={fullWidth ? 'lg:col-span-3' : undefined}>
      <span className="mb-2 block text-[1.1rem] font-medium text-[#f79b63] sm:text-[1.2rem]">
        {label}
      </span>
      <div className="border-b border-[#f79b63] pb-2">
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(name, event.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-[1rem] italic text-[#6a666f] outline-none placeholder:text-[#6a666f] sm:text-[1.05rem]"
        />
      </div>
    </label>
  )
}

export default RecextInputField
