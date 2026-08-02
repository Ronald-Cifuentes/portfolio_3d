import './ProjectShowcase.css'

import { PROJECTS } from '../../constants'
import ShowcaseCard from './ShowcaseCard'
import { projectMatchesSelectedTech } from '../../lib/techMatching'
import { t } from '../../lib/i18n'

const EmptyResult = ({ selectedTech }) => (
  <p className='project-showcase__empty text-secondary'>
    {t('projects.emptyPrefix')} <span className='text-white font-semibold'>#{selectedTech}</span>.
  </p>
)

const ProjectShowcase = ({ selectedTech = '', onSelectTech }) => {
  if (!selectedTech) return null

  const matchingProjects = PROJECTS.filter(project =>
    projectMatchesSelectedTech(project, selectedTech)
  )

  return (
    <div className='project-showcase' data-visible='true'>
      {matchingProjects.length === 0 ? (
        <EmptyResult selectedTech={selectedTech} />
      ) : (
        <div className='flex flex-wrap gap-10 justify-center'>
          {matchingProjects.map((project, index) => (
            <ShowcaseCard
              key={project.name}
              project={project}
              onSelectTech={onSelectTech}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProjectShowcase
