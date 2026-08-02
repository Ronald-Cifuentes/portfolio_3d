import '../shared/reveal-animations.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-coverflow'
import './Projects.css'

import { A11y, Autoplay, EffectCoverflow, Keyboard, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { m } from 'motion/react'

import { PROJECTS } from '../../constants'
import { REVEAL_STATE } from '../../lib/revealState'
import ProjectSlide from './ProjectSlide'
import { cx } from '../../lib/classNames'
import { loopedSlides, slideKey, symmetricNeighbourRadius } from '../../lib/carousel'
import { prefersReducedMotion } from '../../platform/mediaPreferences'
import { styles } from '../../styles'
import { t } from '../../lib/i18n'
import { textVariant } from '../../lib/motionVariants'
import useInViewport from '../../hooks/useInViewport'
import useRevealOnScroll from '../../hooks/useRevealOnScroll'

const COVERFLOW_EFFECT = Object.freeze({
  rotate: 0,
  stretch: 50,
  depth: 220,
  modifier: 2,
  slideShadows: false,
  scale: 1,
})

const AUTOPLAY = Object.freeze({
  delay: 3500,
  disableOnInteraction: false,
  pauseOnMouseEnter: true,
})

const SWIPER_MODULES = [EffectCoverflow, Navigation, Autoplay, Keyboard, A11y]
const MIN_LOOP_SLIDES = 16
const LOOP_BUFFER = 4
const NEIGHBOURS_PER_SIDE = 3
const CAROUSEL_VIEWPORT_MARGIN = '100px'

const REVEAL_CLASS_BY_STATE = Object.freeze({
  [REVEAL_STATE.SCROLL_DRIVEN]: 'projects-reveal--scroll',
  [REVEAL_STATE.REVEALED]: 'projects-reveal--fallback animate__animated animate__fast',
  [REVEAL_STATE.PENDING]: 'is-pending',
})

const slotFromCentre = slide => Math.round(slide.progress)

const hideSlidesBeyondNeighbourWindow = swiper => {
  const slides = [...swiper.slides]
  const radius = symmetricNeighbourRadius(slides.map(slotFromCentre), NEIGHBOURS_PER_SIDE)

  slides.forEach(slide => {
    const isBeyondWindow = Math.abs(slotFromCentre(slide)) > radius
    const visibility = isBeyondWindow ? 'hidden' : ''
    if (slide.style.visibility === visibility) return

    slide.style.visibility = visibility
    slide.style.pointerEvents = isBeyondWindow ? 'none' : ''
  })
}

const Projects = ({ onSelectTech }) => {
  const [setRevealNode, revealState] = useRevealOnScroll()
  const [setCarouselNode, carouselInView] = useInViewport(CAROUSEL_VIEWPORT_MARGIN)
  const swiperRef = useRef(null)
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
  const autoplayEnabled = useMemo(() => !prefersReducedMotion(), [])

  const slides = useMemo(() => loopedSlides(PROJECTS, MIN_LOOP_SLIDES), [])

  useEffect(() => {
    if (!autoplayEnabled) return

    const autoplay = swiperRef.current?.autoplay
    if (!autoplay) return

    if (carouselInView) autoplay.start()
    else autoplay.stop()
  }, [autoplayEnabled, carouselInView])

  return (
    <>
      <m.div variants={textVariant()} initial='hidden' animate='show'>
        <h2 className={`${styles.sectionHeadText} text-center`}>{t('projects.heading')}</h2>
      </m.div>

      <div
        ref={setRevealNode}
        className={cx('mt-20 projects-reveal', REVEAL_CLASS_BY_STATE[revealState])}
      >
        <div className='projects-carousel disable-select' ref={setCarouselNode}>
          <Swiper
            modules={SWIPER_MODULES}
            effect='coverflow'
            slidesPerView='auto'
            centeredSlides
            grabCursor
            watchSlidesProgress
            loop={slides.length > 1}
            loopAdditionalSlides={LOOP_BUFFER}
            navigation
            keyboard={{ enabled: true }}
            autoplay={autoplayEnabled ? AUTOPLAY : false}
            coverflowEffect={COVERFLOW_EFFECT}
            onSwiper={swiper => {
              swiperRef.current = swiper
              if (autoplayEnabled && !carouselInView) swiper.autoplay?.stop()
            }}
            onInit={hideSlidesBeyondNeighbourWindow}
            onSetTranslate={hideSlidesBeyondNeighbourWindow}
            onResize={hideSlidesBeyondNeighbourWindow}
            onSlideChange={swiper => setActiveProjectIndex(swiper.realIndex % PROJECTS.length)}
          >
            {slides.map(({ item, pass }, index) => (
              <SwiperSlide key={slideKey(item, pass, index)}>
                <ProjectSlide project={item} onSelectTech={onSelectTech} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className='projects-carousel__dots'>
            {PROJECTS.map((project, index) => (
              <button
                key={project.name}
                type='button'
                className={index === activeProjectIndex ? 'is-active' : undefined}
                aria-label={t('projects.goToProject', { name: project.name })}
                aria-current={index === activeProjectIndex}
                onClick={() => swiperRef.current?.slideToLoop(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Projects
