import { useEffect } from 'react'

import { currentHashSectionId, jumpToSection } from '../platform/sectionNavigation'

const SETTLE_RETRY_DELAYS_MS = Object.freeze([80, 180, 360, 720, 1200, 2000, 3200])

const useHashScrollSettling = () => {
  useEffect(() => {
    let frameIds = []
    let timeoutIds = []

    const clearPending = () => {
      frameIds.forEach(frameId => cancelAnimationFrame(frameId))
      timeoutIds.forEach(timeoutId => window.clearTimeout(timeoutId))
      frameIds = []
      timeoutIds = []
    }

    const settleToHash = () => {
      const sectionId = currentHashSectionId()
      if (!sectionId) return

      const jump = () => jumpToSection(sectionId)

      frameIds.push(
        requestAnimationFrame(() => {
          frameIds.push(
            requestAnimationFrame(() => {
              jump()
              SETTLE_RETRY_DELAYS_MS.forEach(delay => {
                timeoutIds.push(window.setTimeout(jump, delay))
              })
            })
          )
        })
      )
    }

    const scrollToNewHash = () => {
      clearPending()
      const sectionId = currentHashSectionId()
      if (!sectionId) return

      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    settleToHash()
    window.addEventListener('popstate', scrollToNewHash)

    return () => {
      clearPending()
      window.removeEventListener('popstate', scrollToNewHash)
    }
  }, [])
}

export default useHashScrollSettling
