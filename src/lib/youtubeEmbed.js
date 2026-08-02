export const YOUTUBE_ORIGIN = 'https://www.youtube-nocookie.com'

const FLAG_ON = '1'
const FLAG_OFF = '0'
const HIDE_VIDEO_ANNOTATIONS = '3'

export const DEFAULT_SEGMENT_SECONDS = 60
export const MIN_SEGMENT_SECONDS = 5

const BACKGROUND_PLAYER_PARAMS = Object.freeze({
  autoplay: FLAG_ON,
  controls: FLAG_OFF,
  disablekb: FLAG_ON,
  enablejsapi: FLAG_ON,
  fs: FLAG_OFF,
  iv_load_policy: HIDE_VIDEO_ANNOTATIONS,
  loop: FLAG_ON,
  mute: FLAG_ON,
  playsinline: FLAG_ON,
  rel: FLAG_OFF,
})

const isFiniteNumber = value => typeof value === 'number' && Number.isFinite(value)

const asOptionalSeconds = value => (isFiniteNumber(value) ? value : undefined)

export const normalizePlaylist = playlist => {
  if (!Array.isArray(playlist)) return []

  return playlist
    .filter(entry => typeof entry?.videoId === 'string' && entry.videoId.trim().length > 0)
    .map(entry => ({
      videoId: entry.videoId.trim(),
      start: asOptionalSeconds(entry.start),
      end: asOptionalSeconds(entry.end),
    }))
}

export const playlistStorageKey = playlist =>
  playlist.length === 0 ? null : `ytbg:lastIndex:${playlist.map(e => e.videoId).join('|')}`

export const segmentSeconds = entry => {
  const start = isFiniteNumber(entry?.start) ? Math.max(0, entry.start) : 0
  const end =
    isFiniteNumber(entry?.end) && entry.end > 0 ? entry.end : start + DEFAULT_SEGMENT_SECONDS

  return Math.max(MIN_SEGMENT_SECONDS, end - start)
}

export const indexAvoidingRepeat = (length, candidateIndex, previousIndex) => {
  if (length <= 1) return 0
  if (!isFiniteNumber(previousIndex) || candidateIndex !== previousIndex) return candidateIndex

  return (candidateIndex + 1) % length
}

export const buildEmbedUrl = ({ videoId, start, end, youtubeQuality, pageOrigin }) => {
  if (!videoId) return ''

  const params = new URLSearchParams(BACKGROUND_PLAYER_PARAMS)
  params.set('playlist', videoId)
  params.set('vq', youtubeQuality)

  if (isFiniteNumber(start) && start >= 0) params.set('start', String(Math.floor(start)))
  if (isFiniteNumber(end) && end > 0) params.set('end', String(Math.floor(end)))
  if (pageOrigin) params.set('origin', pageOrigin)

  return `${YOUTUBE_ORIGIN}/embed/${encodeURIComponent(videoId)}?${params.toString()}`
}
