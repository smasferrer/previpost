import { appPaths } from './paths'

export interface NavigationItem {
  label: string
  to: string
  description?: string
  isActive?: (pathname: string, search: string) => boolean
}

export interface NavigationGroup {
  label: string
  items: NavigationItem[]
}

export const navigationItems: NavigationGroup[] = [
  {
    label: 'Recaudacion',
    items: [
      {
        label: 'Consulta Rec. Externa',
        to: appPaths.consultaRecext, 
      },
    ],
  },
  {
    label: 'API Consultas',
    items: [
      {
        label: 'Por RUT',
        to: `${appPaths.apiConsultas}?tipo=rut`,
        isActive: (pathname, search) =>
          pathname === appPaths.apiConsultas &&
          (!search || new URLSearchParams(search).get('tipo') === 'rut'),
      },
      {
        label: 'Transacciones por dia',
        to: `${appPaths.apiConsultas}?tipo=transacciones-dia`,
        description: 'Subconsulta',
        isActive: (pathname, search) =>
          pathname === appPaths.apiConsultas &&
          new URLSearchParams(search).get('tipo') === 'transacciones-dia',
      },
      {
        label: 'Por token',
        to: `${appPaths.apiConsultas}?tipo=token`,
        description: 'Subconsulta',
        isActive: (pathname, search) =>
          pathname === appPaths.apiConsultas &&
          new URLSearchParams(search).get('tipo') === 'token',
      },
    ],
  },
]
