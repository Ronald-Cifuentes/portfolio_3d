const sessionStorageOrNull = () => {
  try {
    return typeof window === 'undefined' ? null : window.sessionStorage
  } catch {
    return null
  }
}

export const readSessionValue = key => {
  if (!key) return null

  try {
    return sessionStorageOrNull()?.getItem(key) ?? null
  } catch {
    return null
  }
}

export const writeSessionValue = (key, value) => {
  if (!key) return

  try {
    sessionStorageOrNull()?.setItem(key, value)
  } catch {}
}
