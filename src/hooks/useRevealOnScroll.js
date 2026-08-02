import { useEffect, useMemo, useState } from 'react'

import { observeIntersection } from './useInViewport'
import { revealStateOf } from '../lib/revealState'

const REVEAL_OBSERVER_OPTIONS = Object.freeze({
  threshold: 0.2,
  rootMargin: '0px 0px -60px 0px',
})

const supportsViewTimeline = () =>
  typeof CSS !== 'undefined' &&
  typeof CSS.supports === 'function' &&
  CSS.supports('animation-timeline', 'view()')

const useRevealOnScroll = (options = REVEAL_OBSERVER_OPTIONS) => {
  const [node, setNode] = useState(null)
  const scrollDriven = useMemo(supportsViewTimeline, [])
  const [revealed, setRevealed] = useState(scrollDriven)

  useEffect(() => {
    if (scrollDriven || !node) return undefined

    return observeIntersection(node, options, setRevealed)
  }, [node, options, scrollDriven])

  return [setNode, revealStateOf({ scrollDriven, revealed })]
}

export default useRevealOnScroll
