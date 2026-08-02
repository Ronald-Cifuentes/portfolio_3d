import { github } from '../../assets'
import { splitPreview } from '../../lib/preview'
import { t } from '../../lib/i18n'

const PREVIEW_TAG_COUNT = 4

const ShowcaseCard = ({ project, onSelectTech, index }) => {
  const tags = splitPreview(project.tags, PREVIEW_TAG_COUNT)

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
            {tags.visible.map(tag => (
              <li key={tag.name}>
                <button
                  type='button'
                  className={tag.color}
                  onClick={() => onSelectTech(tag.name)}
                  aria-label={t('projects.filterByTag', { tag: tag.name })}
                  data-tooltip={t('projects.filterByTag', { tag: tag.name })}
                >
                  #{tag.name}
                </button>
              </li>
            ))}
            {tags.hiddenCount > 0 && (
              <li className='project-showcase__more'>+{tags.hiddenCount}</li>
            )}
          </ul>

          <a
            className='project-showcase__cta'
            href={project.sourceCodeUrl}
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

export default ShowcaseCard
