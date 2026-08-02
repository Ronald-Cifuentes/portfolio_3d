import { TRANSLATIONS } from '../constants/translations'

export const DEFAULT_LOCALE = 'en'
export const AVAILABLE_LOCALES = Object.freeze(Object.keys(TRANSLATIONS))

const PLACEHOLDER = /\{\{(\w+)\}\}/g

const valueAtPath = (dictionary, path) =>
  path.split('.').reduce((branch, key) => (branch == null ? undefined : branch[key]), dictionary)

const interpolate = (template, values) =>
  template.replace(PLACEHOLDER, (placeholder, key) =>
    key in values ? String(values[key]) : placeholder
  )

export const translate = (path, values = {}, locale = DEFAULT_LOCALE) => {
  const translation =
    valueAtPath(TRANSLATIONS[locale], path) ?? valueAtPath(TRANSLATIONS[DEFAULT_LOCALE], path)

  if (translation == null) return path
  if (typeof translation !== 'string') return translation

  return interpolate(translation, values)
}

export const t = translate
