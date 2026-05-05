import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import logo from '../assets/img/logo.svg'
import { useAfpOptionsQuery } from '../features/rex/hooks/useAfpOptionsQuery'
import { appPaths } from '../router/paths'

interface FieldConfig {
  label: string
  placeholder: string
  type?: 'text' | 'select'
}

const mandatoryFields: FieldConfig[] = [
  { label: 'RUT', placeholder: 'Hola' },
  { label: 'Nombres', placeholder: 'Escriba nombre del usuario' },
  { label: 'Apellido Paterno', placeholder: 'Escriba el apellido paterno' },
  { label: 'Apellido Materno', placeholder: 'Escriba el RUT' },
  { label: 'Email', placeholder: 'Escriba nombre del usuario' },
  { label: 'Tipo Pago', placeholder: 'Escriba el apellido paterno' },
  { label: 'Sexo', placeholder: 'Escriba el RUT' },
  { label: 'Teléfono', placeholder: 'Escriba nombre del usuario' },
  { label: 'Nacionalidad', placeholder: 'Escriba el apellido paterno' },
]

const optionalFields: FieldConfig[] = [
  {
    label: 'Tipo Trabajador',
    placeholder: 'Seleccione tipo trabajador',
    type: 'select',
  },
  {
    label: 'Régimen Tributario',
    placeholder: 'Seleccione tipo trabajador',
    type: 'select',
  },
  { label: 'Total del Pago', placeholder: 'Seleccione tipo trabajador' },
  {
    label: 'Origen de los Fondos',
    placeholder: 'Seleccione tipo trabajador',
    type: 'select',
  },
  { label: 'Comuna', placeholder: 'Seleccione tipo trabajador', type: 'select' },
  { label: 'Ciudad', placeholder: 'Seleccione tipo trabajador', type: 'select' },
  { label: 'Región', placeholder: 'Seleccione tipo trabajador', type: 'select' },
]

interface LineFieldProps extends FieldConfig {
  fullWidth?: boolean
}

function LineField({
  label,
  placeholder,
  type = 'text',
  fullWidth = false,
}: LineFieldProps) {
  if (type === 'select') {
    return (
      <label className={fullWidth ? 'lg:col-span-3' : undefined}>
        <span className="mb-2 block text-[1.1rem] font-medium text-[#f79b63] sm:text-[1.2rem]">
          {label}
        </span>
        <div className="relative border-b border-[#f79b63] pb-2">
          <select
            defaultValue=""
            className="w-full appearance-none bg-transparent pr-7 text-[1rem] italic text-[#6a666f] outline-none sm:text-[1.05rem]"
          >
            <option value="" disabled>
              {placeholder}
            </option>
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
          placeholder={placeholder}
          className="w-full bg-transparent text-[1rem] italic text-[#6a666f] outline-none placeholder:text-[#6a666f] sm:text-[1.05rem]"
        />
      </div>
    </label>
  )
}

function ConsultaRexPage() {
  const navigate = useNavigate()
  const [afp, setAfp] = useState('')
  const { data: afpOptions = [], isLoading, isError } = useAfpOptionsQuery()

  const showForm = afp !== ''

  return (
    <main className="min-h-screen bg-[#1c1a22] px-4 py-6 text-[#f3f1e9] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1920px]">
        <Link to={appPaths.home}>
          <img src={logo} alt="PreviPost" className="mb-5 w-[126px] sm:w-[154px]" />
        </Link>

        <div className="grid gap-5 xl:grid-cols-[1.03fr_0.97fr]">
          <section className="space-y-5">
            <div className="grid gap-4 rounded-[1.25rem] bg-[#281b12] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.14)] sm:grid-cols-2">
              <div className="rounded-[0.9rem] border border-[#f79b63] bg-[#4b2a17] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                <span className="mb-2 block text-[1rem] font-medium text-[#f79b63] sm:text-[1.1rem]">
                  Consulta seleccionada
                </span>
                <div className="relative border-b border-[#f79b63] pb-2">
                  <select
                    value="rex"
                    onChange={(event) => {
                      if (event.target.value === 'api') {
                        navigate(appPaths.apiConsultas)
                      }
                    }}
                    className="w-full appearance-none bg-transparent pr-7 text-[1rem] text-[#f3f1e9] outline-none sm:text-[1.05rem]"
                  >
                    <option value="rex">Consulta REX</option>
                    <option value="api">API Consultas</option>
                  </select>
                  <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-[0.8rem] text-[#f3f1e9]">
                    ▼
                  </span>
                </div>
              </div>

              <div className="px-1 py-3">
                <span className="mb-2 block text-[1rem] font-medium text-[#f79b63] sm:text-[1.1rem]">
                  Seleccione AFP
                </span>
                <div className="relative border-b border-[#f79b63] pb-2">
                  <select
                    value={afp}
                    onChange={(event) => setAfp(event.target.value)}
                    className={`w-full appearance-none bg-transparent pr-7 outline-none sm:text-[1.05rem] ${
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

                    <button
                      type="button"
                      disabled
                      className="w-full rounded-lg bg-[#2c2c2c] px-8 py-3 text-[1rem] font-semibold text-[#3f3f3f] sm:w-[274px]"
                    >
                      Consultar
                    </button>
                  </div>

                  <div className="grid gap-x-7 gap-y-8 lg:grid-cols-3">
                    {mandatoryFields.map((field) => (
                      <LineField
                        key={field.label}
                        label={field.label}
                        placeholder={field.placeholder}
                      />
                    ))}

                    <LineField
                      label="URL de Retorno"
                      placeholder="Escriba el RUT"
                      fullWidth
                    />
                  </div>

                  <div className="mt-12">
                    <p className="mb-8 text-[1.05rem] text-[#8b8a8f] sm:text-[1.1rem]">
                      Información opcional
                    </p>

                    <div className="grid gap-x-7 gap-y-8 lg:grid-cols-3">
                      {optionalFields.map((field, index) => (
                        <LineField
                          key={field.label}
                          label={field.label}
                          placeholder={field.placeholder}
                          type={field.type}
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

                    <button
                      type="button"
                      disabled
                      className="w-full rounded-lg bg-[#2c2c2c] px-8 py-3 text-[1rem] font-semibold text-[#3f3f3f] sm:w-[274px]"
                    >
                      Consultar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

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
                Estado
              </div>

              <div className="min-h-[435px] rounded-[0.95rem] bg-[#1b1a22]" />

              <div className="mt-4 overflow-hidden rounded-[0.95rem] bg-[#111015]">
                <div className="border-b border-white/5 px-5 py-1.5 text-[0.9rem] font-semibold text-[#96959a]">
                  Json
                </div>
                <div className="min-h-[258px] bg-[#1b1a22]" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

export default ConsultaRexPage
