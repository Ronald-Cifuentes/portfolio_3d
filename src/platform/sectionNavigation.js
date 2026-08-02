export const currentHashSectionId = () => {
  const hash = window.location.hash?.replace('#', '')

  return hash ? decodeURIComponent(hash) : null
}

export const navigateToSection = sectionId => {
  const target = document.getElementById(sectionId)
  if (!target) return

  const nextHash = `#${encodeURIComponent(sectionId)}`
  if (window.location.hash !== nextHash) {
    window.history.pushState(null, '', nextHash)
  }

  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export const jumpToSection = sectionId => {
  const target = document.getElementById(sectionId)
  if (!target) return

  const root = document.documentElement
  const previousScrollBehavior = root.style.scrollBehavior
  root.style.scrollBehavior = 'auto'
  window.scrollTo({ top: window.scrollY + target.getBoundingClientRect().top, behavior: 'auto' })
  root.style.scrollBehavior = previousScrollBehavior
}
