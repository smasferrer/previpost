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
  canSubmit: boolean
  isSubmitting: boolean
  onFieldChange: (name: keyof RecextConsultationFormValues, value: string) => void
  onSubmit: () => void
}

function RecextFormSection({
  showForm,
  values,
  optionsByField = {},
  canSubmit,
  isSubmitting,
  onFieldChange,
  onSubmit,
}: RecextFormSectionProps) {
  const isSubmitDisabled = !canSubmit || isSubmitting

  return (
    <div className="min-h-[620px] rounded-[1.2rem] bg-[#1c1c1c] px-5 py-5 shadow-[0_18px_38px_rgba(0,0,0,0.16)] sm:px-8 sm:py-7">
      {showForm ? (
        <div>
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="mb-8 text-[1.2rem] font-medium text-[#02d3ff] sm:text-[1.35rem]">
                Pegar Información de Usuario
              </h2>
              <p className="text-[1.05rem] text-[#8b8a8f] sm:text-[1.1rem]">
                Información obligatoria
              </p>
            </div>

            <RecextActionButton
              disabled={isSubmitDisabled}
              isLoading={isSubmitting}
              onClick={onSubmit}
            />
          </div>

          <div className="grid gap-x-7 gap-y-8 lg:grid-cols-3">
            {mandatoryFields.map((field) => (
              <RecextInputField
                key={field.name}
                {...field}
                value={values[field.name]}
                options={optionsByField[field.name]}
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
            <span className="text-[1.8rem] font-medium text-[#292929] sm:text-[2rem]">
              Pegar Información de Usuario
            </span>

            <RecextActionButton
              disabled={isSubmitDisabled}
              isLoading={isSubmitting}
              onClick={onSubmit}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default RecextFormSection
