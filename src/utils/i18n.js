import translations from '../constants/i18n.json'

export const DEFAULT_LOCALE = 'en'
export const AVAILABLE_LOCALES = Object.keys(translations)

const resolve = (dictionary, path) =>
  path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), dictionary)

const interpolate = (value, vars) =>
  value.replace(/\{\{(\w+)\}\}/g, (match, key) => (key in vars ? String(vars[key]) : match))







export const t = (path, vars = {}, locale = DEFAULT_LOCALE) => {
  const value = resolve(translations[locale], path) ?? resolve(translations[DEFAULT_LOCALE], path)

  if (value == null) return path
  if (typeof value !== 'string') return value

  return interpolate(value, vars)
}

export default t
