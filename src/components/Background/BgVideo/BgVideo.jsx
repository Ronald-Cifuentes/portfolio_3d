import React, { useEffect, useRef } from 'react'

const BgVideo = () => {
  const video1El = useRef(null)

  const attemptPlay = () => {
    video1El &&
      video1El.current &&
      video1El.current
        .play()
        .then(_ => {
          console.log('Success video background')
        })
        .catch(error => {
          console.error('Error attempting to play', error)
        })
  }

  useEffect(() => {
    attemptPlay()
  }, [])

  return (
    <video className='absolute z-0' loop muted ref={video1El}>
      <source src='https://r-sources.ddns.net/Abstract_Liquids.mkv' type='video/mp4' />
      Your browser does not support HTML video.
    </video>
  )
}

export default BgVideo
