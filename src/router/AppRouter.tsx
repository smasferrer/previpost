import { Route, Routes } from 'react-router'
import HomePage from '../pages/HomePage'
import ConsultaRexPage from '../pages/ConsultaRexPage'
import ApiConsultasPage from '../pages/ApiConsultasPage'
import NotFoundPage from '../pages/NotFoundPage'
import { appPaths } from './paths'

function AppRouter() {
  return (
    <Routes>
      <Route path={appPaths.home} element={<HomePage />} />
      <Route path={appPaths.consultaRex} element={<ConsultaRexPage />} />
      <Route path={appPaths.apiConsultas} element={<ApiConsultasPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRouter
