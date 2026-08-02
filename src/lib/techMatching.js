const ALIASES_BY_NORMALIZED_NAME = Object.freeze({
  javascript: ['js'],
  nextjs: ['next'],
  nodejs: ['node'],
  reactjs: ['react'],
  reduxtoolkit: ['redux'],
  threejs: ['three'],
  typescript: ['ts'],
})

const JS_SUFFIX = 'js'
const MIN_LENGTH_FOR_SUBSTRING_MATCH = 3

export const normalizeTechName = value =>
  String(value ?? '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '')

const candidatesFor = rawName => {
  const normalized = normalizeTechName(rawName)
  if (!normalized) return new Set()

  const candidates = new Set([normalized, ...(ALIASES_BY_NORMALIZED_NAME[normalized] ?? [])])

  if (normalized.length > JS_SUFFIX.length && normalized.endsWith(JS_SUFFIX)) {
    candidates.add(normalized.slice(0, -JS_SUFFIX.length))
  }

  return candidates
}

const shareACandidate = (candidates, otherCandidates) =>
  [...candidates].some(candidate => otherCandidates.has(candidate))

const eitherContainsTheOther = (candidates, otherCandidates) =>
  [...candidates].some(candidate =>
    [...otherCandidates].some(
      other =>
        candidate.length >= MIN_LENGTH_FOR_SUBSTRING_MATCH &&
        other.length >= MIN_LENGTH_FOR_SUBSTRING_MATCH &&
        (candidate.includes(other) || other.includes(candidate))
    )
  )

export const techNamesMatchExactly = (name, otherName) => {
  const candidates = candidatesFor(name)
  const otherCandidates = candidatesFor(otherName)
  if (candidates.size === 0 || otherCandidates.size === 0) return false

  return shareACandidate(candidates, otherCandidates)
}

export const techNamesMatchLoosely = (name, otherName) => {
  const candidates = candidatesFor(name)
  const otherCandidates = candidatesFor(otherName)
  if (candidates.size === 0 || otherCandidates.size === 0) return false

  return (
    shareACandidate(candidates, otherCandidates) ||
    eitherContainsTheOther(candidates, otherCandidates)
  )
}

export const projectMatchesSelectedTech = (project, selectedTech) => {
  if (!selectedTech) return true
  return (project.tags ?? []).some(tag => techNamesMatchLoosely(selectedTech, tag.name))
}
