import { VerticalTimelineElement } from 'react-vertical-timeline-component'

import { REVEAL_STATE, isRevealed } from '../../lib/revealState'
import { cx } from '../../lib/classNames'
import { onActivationKey } from '../../lib/keyboardActivation'
import { splitPreview } from '../../lib/preview'
import { t } from '../../lib/i18n'
import useRevealOnScroll from '../../hooks/useRevealOnScroll'

const REVEAL_STAGGER_MS = 90
const PREVIEW_HIGHLIGHT_COUNT = 2
const PREVIEW_TECH_COUNT = 4

const ICON_CLASS_BY_REVEAL_STATE = Object.freeze({
  [REVEAL_STATE.SCROLL_DRIVEN]: 'exp-icon--scroll',
  [REVEAL_STATE.REVEALED]: 'animate__animated animate__zoomIn',
  [REVEAL_STATE.PENDING]: 'exp-icon--pending',
})

const CONTENT_CLASS_BY_REVEAL_STATE = Object.freeze({
  [REVEAL_STATE.SCROLL_DRIVEN]: 'experience-reveal--scroll',
  [REVEAL_STATE.REVEALED]: 'experience-reveal--fallback animate__animated animate__fast',
  [REVEAL_STATE.PENDING]: 'is-pending',
})

const TIMELINE_CONTENT_STYLE = Object.freeze({
  background: 'transparent',
  boxShadow: 'none',
  padding: 0,
})

const TIMELINE_ARROW_STYLE = Object.freeze({ borderRight: '7px solid rgba(145, 94, 255, 0.25)' })

const sideForIndex = index =>
  index % 2 === 0 ? 'experience-reveal--left' : 'experience-reveal--right'

const ExperienceCard = ({ experience, index, onSelect }) => {
  const [setRevealNode, revealState] = useRevealOnScroll()

  const highlights = splitPreview(experience.points, PREVIEW_HIGHLIGHT_COUNT)
  const technologies = splitPreview(experience.technologies, PREVIEW_TECH_COUNT)

  return (
    <VerticalTimelineElement
      visible
      contentStyle={TIMELINE_CONTENT_STYLE}
      contentArrowStyle={TIMELINE_ARROW_STYLE}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      iconClassName={ICON_CLASS_BY_REVEAL_STATE[revealState]}
      icon={
        <div className='experience-icon'>
          <img
            src={experience.icon}
            alt={experience.companyName}
            className='experience-icon__logo'
          />
        </div>
      }
    >
      <div
        ref={setRevealNode}
        style={{ '--exp-delay': `${index * REVEAL_STAGGER_MS}ms` }}
        className={cx(
          'experience-reveal',
          CONTENT_CLASS_BY_REVEAL_STATE[revealState],
          isRevealed(revealState) && sideForIndex(index)
        )}
      >
        <div
          role='button'
          tabIndex={0}
          aria-haspopup='dialog'
          aria-label={t('experience.cardAriaLabel', {
            title: experience.title,
            company: experience.companyName,
          })}
          onClick={() => onSelect(experience)}
          onKeyDown={onActivationKey(() => onSelect(experience))}
          className={cx('experience-card', isRevealed(revealState) && 'is-revealed')}
        >
          <div className='flex items-start justify-between gap-3'>
            <div className='min-w-0'>
              <h3 className='experience-card__title'>{experience.title}</h3>
              <p className='experience-card__company'>{experience.companyName}</p>
              {experience.location && (
                <p className='experience-card__meta'>{experience.location}</p>
              )}
            </div>
            <span aria-hidden='true' className='experience-badge'>
              ↗
            </span>
          </div>

          <ul className='experience-card__points'>
            {highlights.visible.map(point => (
              <li key={point} className='experience-card__point'>
                {point}
              </li>
            ))}
          </ul>

          {highlights.hiddenCount > 0 && (
            <p className='experience-card__more'>
              {t(
                highlights.hiddenCount > 1
                  ? 'experience.moreHighlightsOther'
                  : 'experience.moreHighlightsOne',
                { count: highlights.hiddenCount }
              )}
            </p>
          )}

          {technologies.visible.length > 0 && (
            <ul className='experience-card__tech'>
              {technologies.visible.map(tech => (
                <li key={tech}>{tech}</li>
              ))}
              {technologies.hiddenCount > 0 && <li>+{technologies.hiddenCount}</li>}
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

export default ExperienceCard
