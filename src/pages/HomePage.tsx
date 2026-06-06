import { Link } from 'react-router'
import apiIcon from '../assets/img/icono-apiconsultas.svg'
import recextIcon from '../assets/img/icono-recext.svg'
import { appPaths } from '../router/paths'
import AppLogo from '../shared/components/brand/AppLogo'
import Card from '../shared/components/ui/Card'

const options = [
  {
    title: 'Consulta Rec. Externa',
    description: 'Realiza consultas en API de Recaudación Externa.',
    icon: recextIcon,
    iconAlt: 'Icono Consulta Rec. Externa',
    to: appPaths.consultaRecext,
  },
  {
    title: 'API Consultas',
    description: 'Realiza consultas diarias, por Token o por RUT.',
    icon: apiIcon,
    iconAlt: 'Icono API Consultas',
    to: appPaths.apiConsultas,
  },
]

function HomePage() {
  return (
    <section className="min-h-[calc(100svh-8.5rem)] px-4 pb-14 pt-8 text-center sm:px-6 sm:pb-16 sm:pt-10 lg:px-8 lg:pb-20 lg:pt-12">
      <div className="mx-auto flex w-full max-w-[1040px] flex-col items-center">
        <div className="mb-9 flex flex-col items-center sm:mb-11">
          <AppLogo className="mb-8 w-[185px] rounded-[var(--radius-md)] px-3 py-2 sm:w-[220px]" />

          <h1 className="max-w-4xl text-4xl font-normal leading-tight text-[var(--color-text-primary)] sm:text-5xl lg:text-[2.5rem]">
            ¿Qué quieres hacer hoy?
          </h1>
        </div>

        <div className="grid w-full max-w-[900px] items-stretch gap-6 md:grid-cols-2 lg:gap-8">
          {options.map((option, index) => (
            <Link
              key={option.title}
              to={option.to}
              className="group h-full rounded-[var(--radius-2xl)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]/50"
            >
              <Card
                as="article"
                className="flex h-full min-h-[300px] flex-col items-center px-7 py-8 transition duration-300 group-hover:-translate-y-1 group-hover:border-[var(--color-border-strong)] group-hover:bg-[var(--color-surface-muted)] group-hover:shadow-[var(--shadow-md)] sm:px-8 sm:py-9"
              >
                <div className="mb-8 flex h-[82px] items-center justify-center">
                  <img
                    src={option.icon}
                    alt={option.iconAlt}
                    className={`h-[74px] w-auto ${
                      index === 0 ? 'sm:translate-x-1' : ''
                    }`}
                  />
                </div>

                <h2 className="min-h-[3.5rem] text-[2rem] font-semibold leading-tight text-[var(--color-text-primary)] sm:text-[1.8rem]">
                  {option.title}
                </h2>

                <p className="mb-3 mt-0 max-w-[260px] text-[1.05rem] leading-relaxed text-[var(--color-secondary)] sm:text-[1.1rem]">
                  {option.description}
                </p>

                <span className="mt-auto inline-flex items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-primary)] px-4 py-2 text-md font-semibold text-[var(--color-primary-contrast)] transition group-hover:bg-[var(--color-primary-hover)] w-full max-w-[160px]">
                  Ingresar
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomePage
