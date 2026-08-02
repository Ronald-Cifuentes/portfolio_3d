import { useEffect } from 'react'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

const wrapTabWithin = (container, event) => {
  const focusable = container.querySelectorAll(FOCUSABLE_SELECTOR)
  if (focusable.length === 0) return

  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  const active = document.activeElement

  if (event.shiftKey && (active === first || active === container)) {
    event.preventDefault()
    last.focus()
    return
  }

  if (!event.shiftKey && active === last) {
    event.preventDefault()
    first.focus()
  }
}

const useFocusTrap = (active, containerRef, initialFocusRef) => {
  useEffect(() => {
    if (!active) return undefined

    const previouslyFocused = document.activeElement

    const trapTab = event => {
      if (event.key !== 'Tab' || !containerRef.current) return

      wrapTabWithin(containerRef.current, event)
    }

    document.addEventListener('keydown', trapTab)
    const focusFrame = requestAnimationFrame(() => initialFocusRef.current?.focus())

    return () => {
      document.removeEventListener('keydown', trapTab)
      cancelAnimationFrame(focusFrame)
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus()
    }
  }, [active, containerRef, initialFocusRef])
}

export default useFocusTrap
