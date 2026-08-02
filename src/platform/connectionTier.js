import { TIERS, throughputMbpsFromResourceTimings, tierForMbps } from '../lib/videoQuality'

const DEFAULT_SAMPLE_COUNT = 6
const DEFAULT_SAMPLE_INTERVAL_MS = 1500
const IMMEDIATELY = 0

const networkInformation = () =>
  typeof navigator === 'undefined'
    ? null
    : navigator.connection || navigator.mozConnection || navigator.webkitConnection

const resourceTimings = () => {
  const unavailable =
    typeof performance === 'undefined' || typeof performance.getEntriesByType !== 'function'

  return unavailable ? null : performance.getEntriesByType('resource')
}

const tierFromNavigatorHint = () => {
  const link = networkInformation()
  if (!link || typeof link.downlink !== 'number') return TIERS.SIMPLE_HD

  return tierForMbps(link.downlink)
}

export const getConnectionTier = ({ since = 0 } = {}) => {
  const entries = resourceTimings()
  const measuredMbps = entries && throughputMbpsFromResourceTimings(entries, since)

  return measuredMbps == null ? tierFromNavigatorHint() : tierForMbps(measuredMbps)
}

export const observeConnectionTier = (
  onChange,
  { samples = DEFAULT_SAMPLE_COUNT, intervalMs = DEFAULT_SAMPLE_INTERVAL_MS } = {}
) => {
  let measurementStartedAt = 0
  let currentTier = getConnectionTier({ since: measurementStartedAt })
  let timer = 0
  let remainingSamples = samples
  let stopped = false

  onChange(currentTier)

  const poll = () => {
    timer = 0
    if (stopped) return

    const nextTier = getConnectionTier({ since: measurementStartedAt })
    if (nextTier !== currentTier) {
      currentTier = nextTier
      onChange(currentTier)
    }

    remainingSamples -= 1
    if (remainingSamples > 0) timer = window.setTimeout(poll, intervalMs)
  }

  timer = window.setTimeout(poll, intervalMs)

  const link = networkInformation()
  const discardSamplesFromPreviousNetwork = () => {
    measurementStartedAt = typeof performance === 'undefined' ? 0 : performance.now()
    remainingSamples = samples
    if (!timer) timer = window.setTimeout(poll, IMMEDIATELY)
  }
  link?.addEventListener?.('change', discardSamplesFromPreviousNetwork)

  return () => {
    stopped = true
    if (timer) window.clearTimeout(timer)
    link?.removeEventListener?.('change', discardSamplesFromPreviousNetwork)
  }
}
