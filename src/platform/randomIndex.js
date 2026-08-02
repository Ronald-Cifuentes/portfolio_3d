export const randomIndexBelow = exclusiveMax => {
  if (exclusiveMax <= 1) return 0

  const cryptography = typeof window === 'undefined' ? null : window.crypto
  if (!cryptography?.getRandomValues) return Math.floor(Math.random() * exclusiveMax)

  const randomValues = new Uint32Array(1)
  cryptography.getRandomValues(randomValues)

  return randomValues[0] % exclusiveMax
}
