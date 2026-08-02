import { useLayoutEffect, useState } from 'react'

import { coverScaleForPlayer } from '../../lib/videoQuality'

const NEGLIGIBLE_SCALE_CHANGE = 0.001

const observeResize = (element, onResize) => {
  if (typeof window.ResizeObserver === 'function') {
    const observer = new window.ResizeObserver(onResize)
    observer.observe(element)

    return () => observer.disconnect()
  }

  window.addEventListener('resize', onResize)

  return () => window.removeEventListener('resize', onResize)
}

const useCoverScale = (containerRef, playerDimensions, enabled) => {
  const [coverScale, setCoverScale] = useState(1)

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!enabled || !container) return undefined

    const updateCoverScale = () => {
      const { width, height } = container.getBoundingClientRect()
      const nextScale = coverScaleForPlayer(width, height, playerDimensions)

      setCoverScale(current =>
        Math.abs(current - nextScale) < NEGLIGIBLE_SCALE_CHANGE ? current : nextScale
      )
    }

    updateCoverScale()

    return observeResize(container, updateCoverScale)
  }, [containerRef, enabled, playerDimensions])

  return coverScale
}

export default useCoverScale
