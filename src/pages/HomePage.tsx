import { Link } from 'react-router'
import apiIcon from '../assets/img/icono-apiconsultas.svg'
import rexIcon from '../assets/img/icono-rex.svg'
import logo from '../assets/img/logo-bajada.svg'
import { appPaths } from '../router/paths'

const options = [
  {
    title: 'Consulta REX',
    description: 'Realiza consultas en API de Recaudación Externa.',
    icon: rexIcon,
    iconAlt: 'Icono Consulta REX',
    to: appPaths.consultaRex,
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
    <main className="min-h-screen bg-[#1c1a22] px-6 py-10 text-center text-[#f1f0e5]">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl flex-col items-center justify-center">
        <img
          src={logo}
          alt="PreviPost"
          className="mb-14 w-[190px] sm:mb-16 sm:w-[230px]"
        />

        <h1 className="mb-12 max-w-4xl text-5xl font-normal tracking-[-0.04em] text-[#f1f0e5] sm:mb-16 sm:text-6xl lg:text-[3.5rem]">
          ¿Qué quieres hacer hoy?
        </h1>

        <section className="grid w-full max-w-[820px] gap-6 md:grid-cols-2">
          {options.map((option, index) => (
            <Link key={option.title} to={option.to} className="group">
              <article className="flex min-h-[320px] flex-col items-center rounded-[2.25rem] border border-white/10 bg-[#20242c] px-8 py-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition duration-300 group-hover:-translate-y-1 group-hover:bg-[#232831] group-hover:shadow-lg">
                <img
                  src={option.icon}
                  alt={option.iconAlt}
                  className={`mb-9 h-[74px] w-auto ${
                    index === 0 ? 'sm:translate-x-1' : ''
                  }`}
                />

                <h2 className="mb-6 text-[2.15rem] font-semibold leading-none tracking-[-0.03em] text-[#d8d8d8] sm:text-[2.45rem]">
                  {option.title}
                </h2>

                <p className="max-w-[250px] text-[1.05rem] leading-[1.45] text-[#f0dc73] sm:text-[1.1rem]">
                  {option.description}
                </p>
              </article>
            </Link>
          ))}
        </section>
      </div>
    </main>
  )
}

export default HomePage
