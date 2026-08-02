import './Background.css'

import { BACKGROUND_PLAYLIST } from '../../constants'
import YoutubeBackground from '../YoutubeBackground'
import { normalizePlaylist } from '../../lib/youtubeEmbed'
import { t } from '../../lib/i18n'
import useInViewport from '../../hooks/useInViewport'
import usePlaylistRotation from '../../hooks/usePlaylistRotation'

const PLAYLIST = normalizePlaylist(BACKGROUND_PLAYLIST)
const SHADE_OPACITY = 0.01
const HERO_VIEWPORT_MARGIN = '0px'

const Background = () => {
  const [setHeroNode, heroInView] = useInViewport(HERO_VIEWPORT_MARGIN)
  const { currentEntry, started, goToPrevious, goToNext } = usePlaylistRotation(PLAYLIST, {
    randomStart: true,
    rotate: heroInView,
  })

  return (
    <>
      <section className='showcase' ref={setHeroNode}>
        <YoutubeBackground
          entry={started ? currentEntry : null}
          playing={heroInView}
          shadeOpacity={SHADE_OPACITY}
        />
      </section>

      <div className='ytbg__controls ytbg__controls--overlay'>
        <button
          className='ytbg__btn ytbg__btn--prev'
          type='button'
          onClick={goToPrevious}
          aria-label={t('background.previousVideo')}
        >
          ‹
        </button>
        <button
          className='ytbg__btn ytbg__btn--next'
          type='button'
          onClick={goToNext}
          aria-label={t('background.nextVideo')}
        >
          ›
        </button>
      </div>
    </>
  )
}

export default Background
