import './YoutubeBackground.css'

import { useEffect, useMemo, useRef, useState } from 'react'

import { PLAYER_COMMAND, sendCommandUntilPlayerBoots } from '../../platform/youtubePlayerCommands'
import { buildEmbedUrl } from '../../lib/youtubeEmbed'
import { cx } from '../../lib/classNames'
import { playerDimensionsForTier } from '../../lib/videoQuality'
import { runWhenIdle } from '../../platform/scheduling'
import useConnectionTier from '../../hooks/useConnectionTier'
import useCoverScale from './useCoverScale'

const IDLE_MOUNT_TIMEOUT_MS = 2000
const COVER_SCALE_UPSCALED_ABOVE = 1.001

const pageOrigin = () => (typeof window === 'undefined' ? undefined : window.location?.origin)

const YoutubeBackground = ({ entry, playing, shadeOpacity }) => {
  const tier = useConnectionTier()
  const videoContainerRef = useRef(null)
  const iframeRef = useRef(null)
  const [iframeMounted, setIframeMounted] = useState(false)

  const playerDimensions = playerDimensionsForTier(tier)
  const coverScale = useCoverScale(videoContainerRef, playerDimensions, iframeMounted)

  const src = useMemo(
    () =>
      buildEmbedUrl({
        videoId: entry?.videoId,
        start: entry?.start,
        end: entry?.end,
        youtubeQuality: playerDimensions.youtubeQuality,
        pageOrigin: pageOrigin(),
      }),
    [entry, playerDimensions.youtubeQuality]
  )

  const readyToMount = Boolean(src) && tier !== null

  useEffect(() => {
    if (!readyToMount) return undefined

    return runWhenIdle(() => setIframeMounted(true), { timeout: IDLE_MOUNT_TIMEOUT_MS })
  }, [readyToMount])

  useEffect(() => {
    if (!iframeMounted || !iframeRef.current) return undefined

    return sendCommandUntilPlayerBoots(
      iframeRef.current,
      playing ? PLAYER_COMMAND.PLAY : PLAYER_COMMAND.PAUSE
    )
  }, [iframeMounted, playing, src])

  return (
    <div className='ytbg' aria-hidden='true'>
      {iframeMounted ? (
        <div className='ytbg__video' ref={videoContainerRef}>
          <iframe
            key={`${src}:${tier}`}
            ref={iframeRef}
            className={cx(
              'ytbg__iframe',
              coverScale > COVER_SCALE_UPSCALED_ABOVE && 'ytbg__iframe--upscaled'
            )}
            src={src}
            title='YouTube background'
            loading='lazy'
            allow='autoplay; encrypted-media; picture-in-picture'
            referrerPolicy='strict-origin-when-cross-origin'
            data-video-quality={tier}
            style={{
              '--ytbg-player-width': `${playerDimensions.width}px`,
              '--ytbg-player-height': `${playerDimensions.height}px`,
              '--ytbg-player-offset-x': `${playerDimensions.width / -2}px`,
              '--ytbg-player-offset-y': `${playerDimensions.height / -2}px`,
              '--ytbg-cover-scale': coverScale,
            }}
          />
        </div>
      ) : (
        <div className='ytbg__fallback' />
      )}

      <div className='ytbg__shade' style={{ opacity: shadeOpacity }} />
    </div>
  )
}

export default YoutubeBackground
