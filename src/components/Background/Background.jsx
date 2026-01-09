import './Background.css'

import BgVideo from './BgVideo'
import React from 'react'
import YoutubeBG from '../YoutubeBG'

const Background = () => {
  return (
    <section className='showcase'>
      {/* <YoutubeBG videoId='L3Dp4oGkn3k' shadeOpacity={0.45} /> */}
      <BgVideo />
    </section>
  )
}

export default Background
