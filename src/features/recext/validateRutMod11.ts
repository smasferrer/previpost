export const validateRutMod11 = (rut: string, dv: string): boolean => {
  const rutNum = parseInt(rut.trim().replace(/\./g, ''), 10)

  if (isNaN(rutNum) || rutNum <= 0) return false

  let sum = 0
  let multiplier = 2
  let n = rutNum

  while (n > 0) {
    sum += (n % 10) * multiplier
    n = Math.floor(n / 10)
    multiplier = multiplier === 7 ? 2 : multiplier + 1
  }

  const remainder = sum % 11
  const computed = 11 - remainder

  const expectedDv =
    computed === 11 ? '0' : computed === 10 ? 'k' : String(computed)

  return dv.trim().toLowerCase() === expectedDv
}
