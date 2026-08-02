import { github } from '../../assets'
import { splitPreview } from '../../lib/preview'
import { t } from '../../lib/i18n'

const PREVIEW_TAG_COUNT = 4

const ProjectSlide = ({ project, onSelectTech }) => {
  const tags = splitPreview(project.tags, PREVIEW_TAG_COUNT)

  return (
    <article className='project-slide' style={{ '--project-shot': `url(${project.image})` }}>
      <a
        className='project-slide__link'
        href={project.sourceCodeUrl}
        target='_blank'
        rel='noopener noreferrer'
        aria-label={t('projects.openSourceCode', { name: project.name })}
      >
        <img
          className='project-slide__image'
          src={project.image}
          alt={t('projects.imageAlt', { name: project.name })}
          loading='lazy'
        />
        <span className='project-slide__repo' aria-hidden='true'>
          <img src={github} alt='' />
        </span>
      </a>

      <div className='project-slide__content'>
        <h3 className='project-slide__title'>{project.name}</h3>

        <ul className='project-slide__tags'>
          {tags.visible.map(tag => (
            <li key={tag.name}>
              <button
                type='button'
                className={tag.color}
                onClick={() => onSelectTech(tag.name)}
                aria-label={t('projects.filterByTag', { tag: tag.name })}
              >
                #{tag.name}
              </button>
            </li>
          ))}
          {tags.hiddenCount > 0 && (
            <li className='project-slide__tags-more'>+{tags.hiddenCount}</li>
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
}

export default ProjectSlide
