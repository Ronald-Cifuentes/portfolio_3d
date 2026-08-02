import { useEffect, useState } from 'react'

export const DEFAULT_ROOT_MARGIN = '200px'

export const observeIntersection = (node, options, onIntersectionChange) => {
  if (typeof IntersectionObserver === 'undefined') {
    onIntersectionChange(true)
    return undefined
  }

  const observer = new IntersectionObserver(entries => {
    const latestEntry = entries[entries.length - 1]
    if (latestEntry) onIntersectionChange(latestEntry.isIntersecting)
  }, options)

  observer.observe(node)

  return () => observer.disconnect()
}

const useInViewport = (rootMargin = DEFAULT_ROOT_MARGIN) => {
  const [node, setNode] = useState(null)
  const [inViewport, setInViewport] = useState(true)

  useEffect(() => {
    if (!node) return undefined

    return observeIntersection(node, { rootMargin }, setInViewport)
  }, [node, rootMargin])

  return [setNode, inViewport]
}

export default useInViewport
