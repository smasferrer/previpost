import { mandatoryFields, optionalFields } from '../formFields'
import type { RecextConsultationFormValues, SelectOption } from '../types'
import RecextActionButton from './RecextActionButton'
import RecextInputField from './RecextInputField'

interface RecextFormSectionProps {
  showForm: boolean
  values: RecextConsultationFormValues
  optionsByField?: Partial<
    Record<keyof RecextConsultationFormValues, SelectOption[]>
  >
  errorsByField?: Partial<Record<keyof RecextConsultationFormValues, string>>
  canSubmit: boolean
  isSubmitting: boolean
  onFieldChange: (name: keyof RecextConsultationFormValues, value: string) => void
  onPasteUserClick: () => void
  onSubmit: () => void
}

function RecextFormSection({
  showForm,
  values,
  optionsByField = {},
  errorsByField = {},
  canSubmit,
  isSubmitting,
  onFieldChange,
  onPasteUserClick,
  onSubmit,
}: RecextFormSectionProps) {
  const isSubmitDisabled = !canSubmit || isSubmitting

  return (
    <div className="min-h-[620px] rounded-[1.2rem] bg-[#1c1c1c] px-2.5 py-2.5 shadow-[0_18px_38px_rgba(0,0,0,0.16)] sm:px-4 sm:py-3.5">
      {showForm ? (
        <div>
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-[1.05rem] text-[#8b8a8f] sm:text-[1.1rem]">
                Información obligatoria
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                className="text-left text-[13px] font-medium text-[#02d3ff] transition hover:text-[#6ee8ff] focus:outline-none focus:ring-2 focus:ring-[#02d3ff]/50"
                disabled={isSubmitting}
                onClick={onPasteUserClick}
                type="button"
              >
                Pegar información de Usuario
              </button>

              <RecextActionButton
                disabled={isSubmitDisabled}
                isLoading={isSubmitting}
                onClick={onSubmit}
              />
            </div>
          </div>

          <div className="grid gap-x-7 gap-y-8 lg:grid-cols-3">
            {mandatoryFields.map((field) => (
              <RecextInputField
                key={field.name}
                {...field}
                value={values[field.name]}
                options={optionsByField[field.name]}
                error={errorsByField[field.name]}
                onChange={onFieldChange}
              />
            ))}
          </div>

          <div className="mt-12">
            <p className="mb-8 text-[1.05rem] text-[#8b8a8f] sm:text-[1.1rem]">
              Información opcional
            </p>

            <div className="grid gap-x-7 gap-y-8 lg:grid-cols-3">
              {optionalFields.map((field, index) => (
                <RecextInputField
                  key={field.name}
                  {...field}
                  value={values[field.name]}
                  options={optionsByField[field.name]}
                  onChange={onFieldChange}
                  fullWidth={index === optionalFields.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex min-h-[560px] flex-col">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                className="text-left text-[13px] font-medium text-[#292929] transition hover:text-[#02d3ff] focus:outline-none focus:ring-2 focus:ring-[#02d3ff]/50"
                disabled={isSubmitting}
                onClick={onPasteUserClick}
                type="button"
              >
                Pegar información de Usuario
              </button>

              <RecextActionButton
                disabled={isSubmitDisabled}
                isLoading={isSubmitting}
                onClick={onSubmit}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RecextFormSection
