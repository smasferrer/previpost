import { Link } from 'react-router'
import { appPaths } from '../router/paths'

function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#1c1a22] px-6 text-center text-[#f3f1e9]">
      <div>
        <p className="mb-3 text-sm uppercase tracking-[0.28em] text-[#f79b63]">
          Ruta no encontrada
        </p>
        <h1 className="mb-4 text-4xl font-normal">404</h1>
        <Link
          to={appPaths.home}
          className="text-[#02d3ff] underline underline-offset-4"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  )
}

export default NotFoundPage
