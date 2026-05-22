import { useQuery } from '@tanstack/react-query'
import { validateRut } from '../api/recextService'

export const useRutValidationQuery = (rut: string, dv: string) => {
  return useQuery({
    queryKey: ['recext', 'rut-validation', rut, dv],
    queryFn: () => validateRut(rut, dv),
    enabled: Boolean(rut.trim() && dv.trim()),
  })
}
