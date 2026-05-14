import { Link, useNavigate } from 'react-router'
import logo from '../assets/img/logo.svg'
import { appPaths } from '../router/paths'

function ApiConsultasPage() {
  const navigate = useNavigate()

  return (
    <main className="min-h-screen bg-[#1c1a22] px-4 py-6 text-[#f3f1e9] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1200px]">
        <Link to={appPaths.home}>
          <img src={logo} alt="PreviPost" className="mb-5 w-[126px] sm:w-[154px]" />
        </Link>

        <div className="rounded-[1.4rem] bg-[#1f232b] p-6 shadow-[0_18px_38px_rgba(0,0,0,0.16)] sm:p-8">
          <div className="mb-8 grid gap-4 rounded-[1.25rem] bg-[#281b12] p-4 sm:grid-cols-2">
            <div className="rounded-[0.9rem] border border-[#f79b63] bg-[#4b2a17] px-4 py-3">
              <span className="mb-2 block text-[1rem] font-medium text-[#f79b63] sm:text-[1.1rem]">
                Consulta seleccionada
              </span>
              <div className="relative border-b border-[#f79b63] pb-2">
                <select
                  value="api"
                  onChange={(event) => {
                    if (event.target.value === 'recext') {
                      navigate(appPaths.consultaRecext)
                    }
                  }}
                  className="w-full appearance-none bg-transparent pr-7 text-[1rem] text-[#f3f1e9] outline-none sm:text-[1.05rem]"
                >
                  <option value="recext">Consulta Rec. Externa</option>
                  <option value="api">API Consultas</option>
                </select>
                <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-[0.8rem] text-[#f3f1e9]">
                  ▼
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-[1rem] border border-white/8 bg-[#1c1c1c] px-6 py-10 text-left">
            <h1 className="mb-4 text-4xl font-normal text-[#f3f1e9]">
              API Consultas Próximamente
            </h1>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ApiConsultasPage
