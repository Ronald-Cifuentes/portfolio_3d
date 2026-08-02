import 'react-vertical-timeline-component/style.min.css'
import 'animate.css'
import './Experience.css'

import React, { useCallback, useState } from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'

import ExperienceModal from './ExperienceModal'
import { SectionWrapper } from '../hoc'
import { experiences } from '../constants'
import { motion } from 'motion/react'
import { styles } from '../styles'
import { t } from '../utils/i18n'
import { textVariant } from '../utils/motion'
import useRevealOnScroll from '../utils/useRevealOnScroll'

const REVEAL_STAGGER_MS = 90
const PREVIEW_POINTS = 2
const PREVIEW_TECH = 4
const ExperienceCard = ({ experience, index, onSelect }) => {
  const [revealRef, revealed] = useRevealOnScroll()

  const entrance = index % 2 === 0 ? 'animate__fadeInLeft' : 'animate__fadeInRight'
  const points = experience.points ?? []
  const technologies = experience.technologies ?? []
  const hiddenPoints = points.length - PREVIEW_POINTS
  const hiddenTech = technologies.length - PREVIEW_TECH

  const handleKeyDown = event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onSelect(experience)
    }
  }

  return (
    <VerticalTimelineElement
      visible
      contentStyle={{ background: 'transparent', boxShadow: 'none', padding: 0 }}
      contentArrowStyle={{ borderRight: '7px solid rgba(145, 94, 255, 0.25)' }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      iconClassName={revealed ? 'animate__animated animate__zoomIn' : 'exp-icon--pending'}
      icon={
        <div className='flex h-full w-full items-center justify-center'>
          <img
            src={experience.icon}
            alt={experience.company_name}
            className='h-[60%] w-[60%] object-contain'
          />
        </div>
      }
    >
      <div
        ref={revealRef}
        style={{ '--exp-delay': `${index * REVEAL_STAGGER_MS}ms` }}
        className={
          revealed
            ? `experience-reveal animate__animated animate__fast ${entrance}`
            : 'experience-reveal is-pending'
        }
      >
        <div
          role='button'
          tabIndex={0}
          aria-haspopup='dialog'
          aria-label={t('experience.cardAriaLabel', {
            title: experience.title,
            company: experience.company_name,
          })}
          onClick={() => onSelect(experience)}
          onKeyDown={handleKeyDown}
          className={revealed ? 'experience-card is-revealed' : 'experience-card'}
        >
          <div className='flex items-start justify-between gap-3'>
            <div className='min-w-0'>
              <h3 className='experience-card__title'>{experience.title}</h3>
              <p className='experience-card__company'>{experience.company_name}</p>
              {experience.location && (
                <p className='experience-card__meta'>{experience.location}</p>
              )}
            </div>
            <span aria-hidden='true' className='experience-badge'>
              ↗
            </span>
          </div>

          <ul className='experience-card__points'>
            {points.slice(0, PREVIEW_POINTS).map((point, pointIndex) => (
              <li key={`experience-point-${pointIndex}`} className='experience-card__point'>
                {point}
              </li>
            ))}
          </ul>

          {hiddenPoints > 0 && (
            <p className='experience-card__more'>
              {t(
                hiddenPoints > 1
                  ? 'experience.moreHighlightsOther'
                  : 'experience.moreHighlightsOne',
                { count: hiddenPoints }
              )}
            </p>
          )}

          {technologies.length > 0 && (
            <ul className='experience-card__tech'>
              {technologies.slice(0, PREVIEW_TECH).map((tech, techIndex) => (
                <li key={`experience-tech-${techIndex}`}>{tech}</li>
              ))}
              {hiddenTech > 0 && <li>+{hiddenTech}</li>}
            </ul>
          )}

          <span className='experience-cta'>
            {t('experience.cta')}
            <span aria-hidden='true' className='experience-cta__arrow'>
              →
            </span>
          </span>
        </div>
      </div>
    </VerticalTimelineElement>
  )
}

const Experience = () => {
  const [selected, setSelected] = useState(null)
  const handleClose = useCallback(() => setSelected(null), [])

  return (
    <>
      <motion.div variants={textVariant()} initial='hidden' animate='show'>
        <h2 className={`${styles.sectionHeadText} text-center`}>{t('experience.heading')}</h2>
      </motion.div>

      <div className='experience-timeline mt-20 flex flex-col'>
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
              index={index}
              onSelect={setSelected}
            />
          ))}
        </VerticalTimeline>
      </div>

      <ExperienceModal experience={selected} onClose={handleClose} />
    </>
  )
}

export default SectionWrapper(Experience, 'work')
