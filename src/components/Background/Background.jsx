import './Background.css'

import React from 'react'
import YoutubeBG from '../YoutubeBG'

const YT_PLAYLIST = [
  {
    videoId: 'L3Dp4oGkn3k',
    start: 0,
    end: 60,
  },
  {
    videoId: 'lH6qlF_iegU',
    start: 0,
    end: 60,
  },
  {
    videoId: 'ibNrPjETR_k',
    start: 18,
    end: 78,
  },
  {
    videoId: 'pwuFTsvJL34',
    start: 0,
    end: 60,
  },
  {
    videoId: 'TPWYQ94Ief4',
    start: 60,
    end: 120,
  },
  {
    videoId: 'cCFuSD1MIgw',
    start: 0,
    end: 60,
  },
  {
    videoId: 'pLBda_P7leU',
    start: 60,
    end: 120,
  },
  {
    videoId: 'SjC5bezSaWU',
    start: 60,
    end: 120,
  },
]

const Background = ({ ytRef }) => {
  return (
    <section className='showcase'>
      <YoutubeBG ref={ytRef} playlist={YT_PLAYLIST} randomStart shadeOpacity={0.01} />
    </section>
  )
}

export default Background
