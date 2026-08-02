import { YOUTUBE_ORIGIN } from '../lib/youtubeEmbed'

const PLAYER_BOOT_RETRY_DELAYS_MS = Object.freeze([400, 1200, 2500])

export const PLAYER_COMMAND = Object.freeze({
  PLAY: 'playVideo',
  PAUSE: 'pauseVideo',
})

const post = (iframe, command) => {
  try {
    iframe?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: command, args: [] }),
      YOUTUBE_ORIGIN
    )
  } catch {}
}

export const sendCommandUntilPlayerBoots = (iframe, command) => {
  post(iframe, command)

  const retryTimers = PLAYER_BOOT_RETRY_DELAYS_MS.map(delay =>
    window.setTimeout(() => post(iframe, command), delay)
  )

  return () => retryTimers.forEach(timer => window.clearTimeout(timer))
}
