import { useEffect, useState } from 'react'

const DEFAULT_MOUNT_MARGIN = '400px'

const useMountWhenNear = (rootMargin = DEFAULT_MOUNT_MARGIN) => {
  const [node, setNode] = useState(null)
  const [isNear, setIsNear] = useState(false)

  useEffect(() => {
    if (isNear || !node) return undefined

    if (typeof IntersectionObserver === 'undefined') {
      setIsNear(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) setIsNear(true)
      },
      { rootMargin }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [isNear, node, rootMargin])

  return [setNode, isNear]
}

export default useMountWhenNear
