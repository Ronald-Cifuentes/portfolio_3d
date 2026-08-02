import './ProjectShowcase.css'

import React, { useRef } from 'react'

import { github } from '../../assets'
import { matchesSelectedTechToTag } from '../../utils/techFilter'
import { projects } from '../../constants'
import { t } from '../../utils/i18n'

const PREVIEW_TAGS = 4

const ShowcaseCard = ({ project, onSelectTech, index }) => {
  const visibleTags = project.tags.slice(0, PREVIEW_TAGS)
  const hiddenTagCount = project.tags.length - visibleTags.length

  return (
    <article className='project-showcase__card' style={{ '--i': index }}>
      <div className='project-showcase__inner'>
        <div className='project-showcase__media'>
          <img
            src={project.image}
            alt={t('projects.imageAlt', { name: project.name })}
            loading='lazy'
          />
        </div>

        <span className='project-showcase__spotlight' aria-hidden='true' />
        <span className='project-showcase__sheen' aria-hidden='true' />

        <div className='project-showcase__body'>
          <h3 className='project-showcase__title'>{project.name}</h3>

          <ul className='project-showcase__tags'>
            {visibleTags.map(tag => (
              <li key={`${project.name}-${tag.name}`}>
                <button
                  type='button'
                  className={tag.color}
                  onClick={() => onSelectTech?.(tag.name)}
                  aria-label={t('projects.filterByTag', { tag: tag.name })}
                  data-tooltip={t('projects.filterByTag', { tag: tag.name })}
                >
                  #{tag.name}
                </button>
              </li>
            ))}
            {hiddenTagCount > 0 && <li className='project-showcase__more'>+{hiddenTagCount}</li>}
          </ul>

          <a
            className='project-showcase__cta'
            href={project.source_code_link}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={t('projects.openSourceCode', { name: project.name })}
          >
            <img src={github} alt='' width='16' height='16' />
            {t('projects.viewSource')}
            <span aria-hidden='true'>→</span>
          </a>
        </div>
      </div>
    </article>
  )
}

const ProjectShowcase = ({ selectedTech = '', onSelectTech, lastProjectsRef }) => {
  const rootRef = useRef(null)

  const shown = selectedTech
    ? projects.filter(project =>
        project.tags?.some(tag => matchesSelectedTechToTag(selectedTech, tag.name))
      )
    : []

  const hasFilter = Boolean(selectedTech)
  const hasResults = shown.length > 0
  const isEmpty = hasFilter && !hasResults

  if (hasResults && lastProjectsRef) {
    lastProjectsRef.current = shown
  }

  if (!hasFilter) {
    return null
  }

  if (isEmpty) {
    return (
      <div className='project-showcase' ref={rootRef} data-visible='true'>
        <p className='project-showcase__empty text-secondary'>
          {t('projects.emptyPrefix')}{' '}
          <span className='text-white font-semibold'>#{selectedTech}</span>.
        </p>
      </div>
    )
  }

  return (
    <div className='project-showcase' ref={rootRef} data-visible='true'>
      <div className='flex flex-wrap gap-10 justify-center'>
        {shown.map((project, index) => (
          <ShowcaseCard
            key={`showcase-${project.name || project.source_code_link}`}
            project={project}
            onSelectTech={onSelectTech}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}

export default ProjectShowcase
