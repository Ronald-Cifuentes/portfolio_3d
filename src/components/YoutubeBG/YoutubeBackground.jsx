import './youtubeBackground.css'

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'

const YoutubeBG = forwardRef(function YoutubeBG(
  {
    videoId,
    start,
    end,
    playlist,
    randomStart = false,
    shadeOpacity = 0.35,
    className,
    shadeClassName,
    interactive = false,
  },
  ref
) {
  const normalizedPlaylist = useMemo(() => {
    if (!Array.isArray(playlist) || playlist.length === 0) return null
    const filtered = playlist
      .filter(p => p && typeof p.videoId === 'string' && p.videoId.trim().length > 0)
      .map(p => ({
        videoId: p.videoId.trim(),
        start: typeof p.start === 'number' && Number.isFinite(p.start) ? p.start : undefined,
        end: typeof p.end === 'number' && Number.isFinite(p.end) ? p.end : undefined,
      }))
    return filtered.length ? filtered : null
  }, [playlist])

  const playlistStorageKey = useMemo(() => {
    if (!normalizedPlaylist?.length) return null
    return `ytbg:lastIndex:${normalizedPlaylist.map(p => p.videoId).join('|')}`
  }, [normalizedPlaylist])

  const [playlistIndex, setPlaylistIndex] = useState(0)
  const [initialized, setInitialized] = useState(!randomStart)


  useEffect(() => {
    if (!normalizedPlaylist?.length) {
      setInitialized(true)
      return
    }

    const length = normalizedPlaylist.length
    if (!randomStart) {
      setPlaylistIndex(0)
      setInitialized(true)
      return
    }


    const lastRaw =
      typeof window !== 'undefined' ? window.sessionStorage?.getItem(playlistStorageKey) : null
    const lastIndex = lastRaw != null ? Number(lastRaw) : NaN

    const getRandomInt = max => {
      if (max <= 1) return 0
      const cryptoObj = typeof window !== 'undefined' ? window.crypto : null
      if (!cryptoObj?.getRandomValues) return Math.floor(Math.random() * max)
      const buf = new Uint32Array(1)
      cryptoObj.getRandomValues(buf)
      return buf[0] % max
    }

    let nextIndex = getRandomInt(length)
    if (Number.isFinite(lastIndex) && length > 1 && nextIndex === lastIndex) {

      nextIndex = (nextIndex + 1) % length
    }

    try {
      window.sessionStorage?.setItem(playlistStorageKey, String(nextIndex))
    } catch {

    }

    setPlaylistIndex(nextIndex)
    setInitialized(true)
  }, [normalizedPlaylist?.length, playlistStorageKey, randomStart])


  useEffect(() => {
    if (!normalizedPlaylist?.length) return

    const current = normalizedPlaylist[playlistIndex % normalizedPlaylist.length]
    const segStart = typeof current.start === 'number' ? Math.max(0, current.start) : 0
    const segEnd = typeof current.end === 'number' && current.end > 0 ? current.end : segStart + 60
    const durationSec = Math.max(5, segEnd - segStart)

    const t = window.setTimeout(() => {
      setPlaylistIndex(i => (i + 1) % normalizedPlaylist.length)
    }, durationSec * 1000)

    return () => window.clearTimeout(t)
  }, [normalizedPlaylist, playlistIndex])

  const currentVideo = useMemo(() => {
    if (!normalizedPlaylist?.length) {
      return { videoId, start, end }
    }
    return normalizedPlaylist[playlistIndex % normalizedPlaylist.length]
  }, [end, normalizedPlaylist, playlistIndex, start, videoId])

  const persistIndex = useCallback(
    nextIndex => {
      if (!playlistStorageKey) return
      try {
        window.sessionStorage?.setItem(playlistStorageKey, String(nextIndex))
      } catch {

      }
    },
    [playlistStorageKey]
  )

  const goPrev = useCallback(() => {
    if (!normalizedPlaylist?.length) return
    setInitialized(true)
    setPlaylistIndex(i => {
      const nextIndex = (i - 1 + normalizedPlaylist.length) % normalizedPlaylist.length
      persistIndex(nextIndex)
      return nextIndex
    })
  }, [normalizedPlaylist, persistIndex])

  const goNext = useCallback(() => {
    if (!normalizedPlaylist?.length) return
    setInitialized(true)
    setPlaylistIndex(i => {
      const nextIndex = (i + 1) % normalizedPlaylist.length
      persistIndex(nextIndex)
      return nextIndex
    })
  }, [normalizedPlaylist, persistIndex])

  useImperativeHandle(
    ref,
    () => ({
      prev: goPrev,
      next: goNext,
    }),
    [goNext, goPrev]
  )

  const src = useMemo(() => {
    const currentVideoId = currentVideo?.videoId
    if (!currentVideoId) return ''

    const params = new URLSearchParams()
    params.set('autoplay', '1')
    params.set('controls', '0')
    params.set('loop', '1')

    params.set('playlist', currentVideoId)
    params.set('playsinline', '1')

    params.set('iv_load_policy', '3')

    params.set('rel', '0')

    params.set('fs', '0')

    params.set('disablekb', '1')

    params.set('mute', '1')

    if (
      typeof currentVideo.start === 'number' &&
      Number.isFinite(currentVideo.start) &&
      currentVideo.start >= 0
    ) {
      params.set('start', String(Math.floor(currentVideo.start)))
    }
    if (
      typeof currentVideo.end === 'number' &&
      Number.isFinite(currentVideo.end) &&
      currentVideo.end > 0
    ) {
      params.set('end', String(Math.floor(currentVideo.end)))
    }


    if (typeof window !== 'undefined' && window.location?.origin) {
      params.set('origin', window.location.origin)
    }

    return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(
      currentVideoId
    )}?${params.toString()}`
  }, [currentVideo])

  const cl = ['ytbg', className].filter(Boolean).join(' ')
  const shadeCl = ['ytbg__shade', shadeClassName].filter(Boolean).join(' ')

  const [mountIframe, setMountIframe] = useState(false)

  useEffect(() => {
    if (!initialized) return
    let raf1 = 0
    let raf2 = 0
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        setMountIframe(true)
      })
    })
    return () => {
      if (raf1) cancelAnimationFrame(raf1)
      if (raf2) cancelAnimationFrame(raf2)
    }
  }, [initialized])

  return (
    <div className={cl} aria-hidden='true'>
      {mountIframe && (
        <div className={'ytbg__video'}>
          <iframe
            key={src}
            className={'ytbg__iframe'}
            src={src}
            title='YouTube background'
            loading='lazy'
            frameBorder={0}
            allow='autoplay; encrypted-media; picture-in-picture'
            referrerPolicy='strict-origin-when-cross-origin'
            style={{ pointerEvents: interactive ? 'auto' : 'none' }}
          />
        </div>
      )}

      <div className={shadeCl} style={{ opacity: shadeOpacity }} />
    </div>
  )
})

export default YoutubeBG
