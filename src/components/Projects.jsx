import 'animate.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-coverflow'
import './Projects.css'

import React, { useMemo, useRef, useState } from 'react'
import { A11y, Autoplay, EffectCoverflow, Keyboard, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { textVariant } from '../utils/motion'
import { motion } from 'motion/react'
import { styles } from '../styles'

import { SectionWrapper } from '../hoc'
import { github } from '../assets'
import { projects } from '../constants'
import { t } from '../utils/i18n'
import useRevealOnScroll from '../utils/useRevealOnScroll'

const COVERFLOW_EFFECT = {
  rotate: 0,
  stretch: 50,
  depth: 220,
  modifier: 2,


  slideShadows: false,
  scale: 1,
}

const AUTOPLAY = { delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }
const PREVIEW_TAGS = 4


const MIN_LOOP_SLIDES = 16


const LOOP_BUFFER = 4




const NEIGHBOURS_PER_SIDE = 3






const capNeighbours = swiper => {
  const step = slide => Math.round(slide.progress)
  let left = 0
  let right = 0
  swiper.slides.forEach(slide => {
    const p = step(slide)
    if (p > 0 && p <= NEIGHBOURS_PER_SIDE) left += 1
    else if (p < 0 && p >= -NEIGHBOURS_PER_SIDE) right += 1
  })

  const perSide = Math.min(left, right, NEIGHBOURS_PER_SIDE)
  swiper.slides.forEach(slide => {
    const beyond = Math.abs(step(slide)) > perSide
    slide.style.visibility = beyond ? 'hidden' : ''
    slide.style.pointerEvents = beyond ? 'none' : ''
  })
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const ProjectSlide = ({ name, tags, image, source_code_link, onSelectTech }) => (
  <article className='project-slide' style={{ '--project-shot': `url(${image})` }}>
    <a
      className='project-slide__link'
      href={source_code_link}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={t('projects.openSourceCode', { name })}
    >
      <img
        className='project-slide__image'
        src={image}
        alt={t('projects.imageAlt', { name })}
        loading='lazy'
      />
      <span className='project-slide__repo' aria-hidden='true'>
        <img src={github} alt='' />
      </span>
    </a>

    <div className='project-slide__content'>
      <h3 className='project-slide__title'>{name}</h3>

      <ul className='project-slide__tags'>
        {tags.slice(0, PREVIEW_TAGS).map(tag => (
          <li key={`${name}-${tag.name}`}>
            <button
              type='button'
              className={tag.color}
              onClick={() => onSelectTech?.(tag.name)}
              aria-label={t('projects.filterByTag', { tag: tag.name })}
            >
              #{tag.name}
            </button>
          </li>
        ))}
        {tags.length > PREVIEW_TAGS && (
          <li className='project-slide__tags-more'>+{tags.length - PREVIEW_TAGS}</li>
        )}
      </ul>

      <span className='project-slide__cta'>
        {t('projects.viewSource')}
        <span aria-hidden='true' className='project-slide__cta-arrow'>
          →
        </span>
      </span>
    </div>
  </article>
)

const Projects = ({ onSelectTech }) => {
  const [revealRef, revealed] = useRevealOnScroll()
  const swiperRef = useRef(null)
  const [activeProject, setActiveProject] = useState(0)




  const filteredProjects = projects






  const loopedProjects = useMemo(() => {
    if (filteredProjects.length < 2) return filteredProjects.map(project => ({ project, pass: 0 }))
    const passes = Math.ceil(MIN_LOOP_SLIDES / filteredProjects.length)
    return Array.from({ length: passes }, (_, pass) =>
      filteredProjects.map(project => ({ project, pass }))
    ).flat()
  }, [filteredProjects])

  const carouselKey = 'projects-carousel-all'

  return (
    <>
      <motion.div variants={textVariant()} initial='hidden' animate='show'>
        <h2 className={`${styles.sectionHeadText} text-center`}>{t('projects.heading')}</h2>
      </motion.div>

      <div
        ref={revealRef}
        className={
          revealed
            ? 'mt-20 projects-reveal animate__animated animate__fadeInUp animate__fast'
            : 'mt-20 projects-reveal is-pending'
        }
      >
        <div className='projects-carousel disable-select'>
          {filteredProjects.length > 0 && (
            <Swiper
              key={carouselKey}
              modules={[EffectCoverflow, Navigation, Autoplay, Keyboard, A11y]}
              effect='coverflow'
              slidesPerView='auto'
              centeredSlides
              grabCursor
              watchSlidesProgress
              loop={loopedProjects.length > 1}
              loopAdditionalSlides={LOOP_BUFFER}
              navigation
              keyboard={{ enabled: true }}
              autoplay={prefersReducedMotion() ? false : AUTOPLAY}
              coverflowEffect={COVERFLOW_EFFECT}
              onSwiper={swiper => {
                swiperRef.current = swiper
              }}
              onInit={capNeighbours}
              onSetTranslate={capNeighbours}
              onResize={capNeighbours}
              onSlideChange={swiper => setActiveProject(swiper.realIndex % filteredProjects.length)}
            >
              {loopedProjects.map(({ project, pass }, index) => (
                <SwiperSlide
                  key={`project-${pass ?? 0}-${project.name || project.source_code_link || index}`}
                >
                  <ProjectSlide {...project} onSelectTech={onSelectTech} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {filteredProjects.length > 1 && (
            <div className='projects-carousel__dots'>
              {filteredProjects.map((project, index) => (
                <button
                  key={`dot-${project.name || project.source_code_link || index}`}
                  type='button'
                  className={index === activeProject ? 'is-active' : undefined}
                  aria-label={t('projects.goToProject', { name: project.name })}
                  aria-current={index === activeProject}
                  onClick={() => swiperRef.current?.slideToLoop(index)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default SectionWrapper(Projects, 'projects')
