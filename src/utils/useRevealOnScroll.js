import { useEffect, useRef, useState } from 'react'

const OBSERVER_OPTIONS = { threshold: 0.2, rootMargin: '0px 0px -60px 0px' }





const useRevealOnScroll = (options = OBSERVER_OPTIONS) => {
  const ref = useRef(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    if (revealed) return undefined

    const node = ref.current
    if (!node) return undefined

    if (typeof IntersectionObserver === 'undefined') {
      setRevealed(true)
      return undefined
    }

    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setRevealed(true)
        observer.disconnect()
      }
    }, options)

    observer.observe(node)

    return () => observer.disconnect()
  }, [revealed, options])

  return [ref, revealed]
}

export default useRevealOnScroll
