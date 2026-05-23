import { Route, Routes } from 'react-router'
import HomePage from '../pages/HomePage'
import ConsultaRecextPage from '../pages/ConsultaRecextPage'
import ApiConsultasPage from '../pages/ApiConsultasPage'
import NotFoundPage from '../pages/NotFoundPage'
import AppShell from '../shared/components/layout/AppShell'
import { appPaths } from './paths'

function AppRouter() {
  return (
    <Routes>
      <Route path={appPaths.home} element={<HomePage />} />
      <Route
        path={appPaths.consultaRecext}
        element={
          <AppShell>
            <ConsultaRecextPage />
          </AppShell>
        }
      />
      <Route
        path={appPaths.apiConsultas}
        element={
          <AppShell>
            <ApiConsultasPage />
          </AppShell>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRouter
