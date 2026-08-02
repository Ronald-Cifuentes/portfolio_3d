import { runWhenIdle } from './scheduling'

const WARM_UP_DELAY_AFTER_LOAD_MS = 1500
const STARS_IDLE_TIMEOUT_MS = 4000
const EARTH_IDLE_TIMEOUT_MS = 8000
const NOOP_CANCEL = () => {}

const readyListeners = new Set()
let warmUpStarted = false
let chunksReady = false

const markChunksReady = () => {
  if (chunksReady) return

  chunksReady = true
  readyListeners.forEach(listener => listener())
  readyListeners.clear()
}

const warmDeferredChunks = () => {
  if (warmUpStarted) return
  warmUpStarted = true

  runWhenIdle(
    () => {
      import('../components/canvas/StarsCanvas').catch(() => {})
    },
    { timeout: STARS_IDLE_TIMEOUT_MS }
  )

  runWhenIdle(
    () => {
      import('../components/canvas/EarthCanvas')
        .then(module => module.preloadEarthAssets())
        .catch(() => {})
        .finally(markChunksReady)
    },
    { timeout: EARTH_IDLE_TIMEOUT_MS }
  )
}

export const scheduleDeferredChunkWarmUp = () => {
  if (typeof window === 'undefined') return NOOP_CANCEL

  const timer = window.setTimeout(warmDeferredChunks, WARM_UP_DELAY_AFTER_LOAD_MS)

  return () => window.clearTimeout(timer)
}

export const areDeferredChunksReady = () => chunksReady

export const subscribeToDeferredChunks = listener => {
  if (chunksReady) return NOOP_CANCEL

  readyListeners.add(listener)

  return () => readyListeners.delete(listener)
}
