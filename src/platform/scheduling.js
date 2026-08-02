const NOOP_CANCEL = () => {}

const afterNextPaint = task => {
  let secondFrameId = 0
  const firstFrameId = requestAnimationFrame(() => {
    secondFrameId = requestAnimationFrame(task)
  })

  return () => {
    cancelAnimationFrame(firstFrameId)
    if (secondFrameId) cancelAnimationFrame(secondFrameId)
  }
}

export const runWhenIdle = (task, { timeout } = {}) => {
  if (typeof window === 'undefined') return NOOP_CANCEL

  if (typeof window.requestIdleCallback === 'function') {
    const idleId = window.requestIdleCallback(task, timeout ? { timeout } : undefined)

    return () => window.cancelIdleCallback?.(idleId)
  }

  return afterNextPaint(task)
}
