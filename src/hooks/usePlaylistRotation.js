import { useCallback, useEffect, useMemo, useState } from 'react'

import { indexAvoidingRepeat, playlistStorageKey, segmentSeconds } from '../lib/youtubeEmbed'
import { randomIndexBelow } from '../platform/randomIndex'
import { readSessionValue, writeSessionValue } from '../platform/sessionStore'

const MS_PER_SECOND = 1000

const firstIndexFor = (playlist, randomStart, storageKey) => {
  if (!randomStart) return 0

  const previousIndex = Number(readSessionValue(storageKey))

  return indexAvoidingRepeat(playlist.length, randomIndexBelow(playlist.length), previousIndex)
}

const usePlaylistRotation = (playlist, { randomStart, rotate }) => {
  const storageKey = useMemo(() => playlistStorageKey(playlist), [playlist])
  const [index, setIndex] = useState(0)
  const [started, setStarted] = useState(!randomStart)

  useEffect(() => {
    if (playlist.length === 0) {
      setStarted(true)
      return
    }

    const initialIndex = firstIndexFor(playlist, randomStart, storageKey)
    writeSessionValue(storageKey, String(initialIndex))
    setIndex(initialIndex)
    setStarted(true)
  }, [playlist, randomStart, storageKey])

  const moveBy = useCallback(
    step => {
      if (playlist.length === 0) return

      setStarted(true)
      setIndex(current => {
        const nextIndex = (current + step + playlist.length) % playlist.length
        writeSessionValue(storageKey, String(nextIndex))

        return nextIndex
      })
    },
    [playlist.length, storageKey]
  )

  const currentEntry = playlist.length === 0 ? null : playlist[index % playlist.length]

  useEffect(() => {
    if (!rotate || !currentEntry) return undefined

    const timer = window.setTimeout(() => moveBy(1), segmentSeconds(currentEntry) * MS_PER_SECOND)

    return () => window.clearTimeout(timer)
  }, [currentEntry, moveBy, rotate])

  return {
    currentEntry,
    started,
    goToPrevious: useCallback(() => moveBy(-1), [moveBy]),
    goToNext: useCallback(() => moveBy(1), [moveBy]),
  }
}

export default usePlaylistRotation
