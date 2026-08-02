export function normalizeTechName(value) {
  return String(value ?? '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '')
}

function buildCandidates(raw) {
  const n = normalizeTechName(raw)
  const set = new Set()
  if (!n) return set

  set.add(n)

  if (n === 'javascript') set.add('js')
  if (n === 'typescript') set.add('ts')
  if (n === 'reactjs') set.add('react')
  if (n === 'threejs') set.add('three')
  if (n === 'nextjs') set.add('next')
  if (n === 'nodejs') set.add('node')
  if (n === 'reduxtoolkit') {
    set.add('redux')
    set.add('reduxtoolkit')
  }

  if (n.endsWith('js') && n.length > 2) {
    set.add(n.slice(0, -2))
  }

  return set
}

export function techNamesMatch(a, b) {
  const aSet = buildCandidates(a)
  const bSet = buildCandidates(b)
  if (aSet.size === 0 || bSet.size === 0) return false

  for (const x of aSet) {
    if (bSet.has(x)) return true
  }

  for (const x of aSet) {
    for (const y of bSet) {
      const minLen = 3
      if (x.length < minLen || y.length < minLen) continue
      if (x.includes(y) || y.includes(x)) return true
    }
  }

  return false
}

export function matchesSelectedTechToTag(selectedTech, tagName) {
  if (!selectedTech) return true
  return techNamesMatch(selectedTech, tagName)
}

export function techNamesMatchExact(a, b) {
  const aSet = buildCandidates(a)
  const bSet = buildCandidates(b)
  if (aSet.size === 0 || bSet.size === 0) return false

  for (const x of aSet) {
    if (bSet.has(x)) return true
  }

  return false
}
