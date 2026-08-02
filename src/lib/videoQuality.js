const LATENCY_DOMINATED_BELOW_BYTES = 16 * 1024
const MIN_MEASURED_BYTES_TO_TRUST = 60 * 1024
const MIN_ACTIVE_DOWNLOAD_MS = 1
const CACHED_OR_OPAQUE_TRANSFER_SIZE = 0
const EXCLUSIVE_MIN_MBPS_FOR_4K = 120
const INCLUSIVE_MIN_MBPS_FOR_FULL_HD = 60
const BITS_PER_BYTE = 8
const BITS_PER_MEGABIT = 1e6
const MS_PER_SECOND = 1000
const DEFAULT_COVER_OVERSCAN = 1.06

export const TIERS = Object.freeze({
  SIMPLE_HD: 'simple-hd',
  FULL_HD: 'full-hd',
  UHD_4K: '4k',
})

export const VIDEO_QUALITY_PROFILES = Object.freeze({
  [TIERS.SIMPLE_HD]: Object.freeze({
    label: 'Simple HD',
    width: 1280,
    height: 720,
    youtubeQuality: 'hd720',
  }),
  [TIERS.FULL_HD]: Object.freeze({
    label: 'Full HD',
    width: 1920,
    height: 1080,
    youtubeQuality: 'hd1080',
  }),
  [TIERS.UHD_4K]: Object.freeze({
    label: '4K',
    width: 3840,
    height: 2160,
    youtubeQuality: 'hd2160',
  }),
})

export const tierForMbps = mbps => {
  if (typeof mbps !== 'number' || Number.isNaN(mbps)) return TIERS.SIMPLE_HD
  if (mbps > EXCLUSIVE_MIN_MBPS_FOR_4K) return TIERS.UHD_4K
  if (mbps >= INCLUSIVE_MIN_MBPS_FOR_FULL_HD) return TIERS.FULL_HD

  return TIERS.SIMPLE_HD
}

export const playerDimensionsForTier = tier =>
  VIDEO_QUALITY_PROFILES[tier] ?? VIDEO_QUALITY_PROFILES[TIERS.SIMPLE_HD]

export const coverScaleForPlayer = (
  containerWidth,
  containerHeight,
  { width: playerWidth, height: playerHeight },
  overscan = DEFAULT_COVER_OVERSCAN
) => {
  if (!(containerWidth > 0) || !(containerHeight > 0)) return 1

  const scaleToCover = Math.max(containerWidth / playerWidth, containerHeight / playerHeight)

  return Math.max(1, scaleToCover * overscan)
}

const unionDurationMs = intervals => {
  if (intervals.length === 0) return 0

  const sorted = [...intervals].sort((a, b) => a[0] - b[0])
  let total = 0
  let [start, end] = sorted[0]

  for (const [nextStart, nextEnd] of sorted.slice(1)) {
    if (nextStart <= end) {
      end = Math.max(end, nextEnd)
      continue
    }
    total += end - start
    start = nextStart
    end = nextEnd
  }

  return total + (end - start)
}

const wasDownloadedOverNetwork = entry => entry.transferSize > CACHED_OR_OPAQUE_TRANSFER_SIZE

export const throughputMbpsFromResourceTimings = (entries, since = 0) => {
  let downloadedBytes = 0
  const downloadWindows = []

  for (const entry of entries) {
    const bytes = entry.encodedBodySize || 0
    if (!wasDownloadedOverNetwork(entry) || bytes < LATENCY_DOMINATED_BELOW_BYTES) continue

    const { responseStart: downloadStart, responseEnd: downloadEnd } = entry
    if (!(downloadEnd > downloadStart) || downloadStart < since) continue

    downloadedBytes += bytes
    downloadWindows.push([downloadStart, downloadEnd])
  }

  const activeDownloadMs = unionDurationMs(downloadWindows)
  const tooLittleEvidence =
    downloadedBytes < MIN_MEASURED_BYTES_TO_TRUST || activeDownloadMs < MIN_ACTIVE_DOWNLOAD_MS

  if (tooLittleEvidence) return null

  return (downloadedBytes * BITS_PER_BYTE) / (activeDownloadMs / MS_PER_SECOND) / BITS_PER_MEGABIT
}
