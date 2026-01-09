import './youtubeBackground.css'

import React from 'react'
import { useMemo } from 'react'

export default function YoutubeBG({
  videoId,
  start,
  end,
  shadeOpacity = 0.35,
  className,
  shadeClassName,
  interactive = false,
}) {
  const src = useMemo(() => {
    const params = new URLSearchParams()
    params.set('autoplay', '1')
    params.set('controls', '0')
    params.set('loop', '1')
    // Looping a single video requires playlist=VIDEO_ID
    params.set('playlist', videoId)
    params.set('playsinline', '1')
    // Hides annotations by default
    params.set('iv_load_policy', '3')
    // Can't fully disable "related"; rel=0 keeps it in the same channel.
    params.set('rel', '0')
    // Prevent fullscreen button
    params.set('fs', '0')
    // Prevent keyboard shortcuts from controlling the player
    params.set('disablekb', '1')
    // Works in many browsers for muted autoplay
    params.set('mute', '1')

    if (typeof start === 'number' && Number.isFinite(start) && start > 0) {
      params.set('start', String(Math.floor(start)))
    }
    if (typeof end === 'number' && Number.isFinite(end) && end > 0) {
      params.set('end', String(Math.floor(end)))
    }

    // Recommended if you use enablejsapi; harmless otherwise.
    if (typeof window !== 'undefined' && window.location?.origin) {
      params.set('origin', window.location.origin)
    }

    return `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?${params.toString()}`
  }, [videoId, start, end])

  const cl = ['ytbg', className].filter(Boolean).join(' ')
  const shadeCl = ['ytbg__shade', shadeClassName].filter(Boolean).join(' ')

  return (
    <div className={cl} aria-hidden='true'>
      <div className={'ytbg__video'}>
        <iframe
          className={'ytbg__iframe'}
          src={src}
          title='YouTube background'
          frameBorder={0}
          allow='autoplay; encrypted-media; picture-in-picture'
          referrerPolicy='strict-origin-when-cross-origin'
          // important: prevents hover/click UI
          style={{ pointerEvents: interactive ? 'auto' : 'none' }}
        />
      </div>

      <div className={shadeCl} style={{ opacity: shadeOpacity }} />
    </div>
  )
}
