import React, { useMemo } from 'react'
import { fadeIn, textVariant } from '../utils/motion'

import { SectionWrapper } from '../hoc'
import Tilt from 'react-parallax-tilt'
import { github } from '../assets'
import { motion } from 'motion/react'
import { matchesSelectedTechToTag, normalizeTechName } from '../utils/techFilter'
import { projects } from '../constants'
import { styles } from '../styles'

const ProjectCard = ({ index, name, tags, image, source_code_link, onSelectTech }) => {
  return (
    <motion.div
      variants={fadeIn('up', 'spring', index * 0.1, 0.75)}
      initial='hidden'
      animate='show'
      onClick={() => window.open(source_code_link, '_blank', 'noopener,noreferrer')}
      className='cursor-pointer w-full'
    >
      <Tilt
        tiltMaxAngleX={45}
        tiltMaxAngleY={45}
        scale={1}
        transitionSpeed={450}
        className='bg-tertiary p-4 rounded-2xl w-full h-full'
      >
        <div className='relative w-full h-[175px]'>
          <img src={image} alt='project_image' className='w-full h-full object-cover rounded-2xl' />

          <div className='absolute inset-0 flex justify-end m-2 card-img_hover'>
            <div className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'>
              <img src={github} alt='source code' className='w-1/2 h-1/2 object-contain' />
            </div>
          </div>
        </div>

        <div className='mt-0'>
          <h3 className='text-white font-bold text-[24px]'>{name}</h3>
        </div>

        <div className='mt-0 flex flex-wrap gap-x-2'>
          {tags.map(tag => (
            <button
              key={`${name}-${tag.name}`}
              type='button'
              className={`text-[14px] ${tag.color} hover:underline`}
              onClick={e => {
                e.stopPropagation()
                onSelectTech?.(tag.name)
              }}
              aria-label={`Filter projects by ${tag.name}`}
            >
              #{tag.name}
            </button>
          ))}
        </div>
      </Tilt>
    </motion.div>
  )
}

const Projects = ({ selectedTech = '', onSelectTech, onClearTech }) => {
  const filteredProjects = useMemo(() => {
    if (!selectedTech) return projects
    return projects.filter(p => p.tags?.some(t => matchesSelectedTechToTag(selectedTech, t.name)))
  }, [selectedTech])

  const gridKey = `projects-grid-${normalizeTechName(selectedTech) || 'all'}`

  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className='w-full flex'>
        <div className='flex flex-col gap-3'>
          <motion.p
            variants={fadeIn('', '', 0.1, 1)}
            className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
          >
            Following projects showcases my skills and experience through real-world examples of my
            work. Each project is briefly described with links to code repositories and live demos
            in it. It reflects my ability to solve complex problems, work with different
            technologies, and manage projects effectively.
          </motion.p>

          {selectedTech && (
            <div className='flex flex-wrap items-center gap-2'>
              <span className='text-secondary text-[14px]'>Filtered by:</span>
              <span className='text-white text-[14px] font-semibold'>#{selectedTech}</span>
              <button
                type='button'
                className='text-[14px] text-secondary hover:text-white underline underline-offset-2'
                onClick={() => {
                  onClearTech?.()
                  // fallback if parent didn't pass onClearTech
                  onSelectTech?.('')
                }}
              >
                Clear
              </button>
              <span className='text-secondary text-[14px]'>({filteredProjects.length})</span>
            </div>
          )}
        </div>
      </div>

      <div key={gridKey} className='mt-10 auto-grid-projects scroll-zone disable-select'>
        {filteredProjects.length === 0 ? (
          <p className='text-secondary'>
            No projects found for <span className='text-white font-semibold'>#{selectedTech}</span>.
          </p>
        ) : (
          filteredProjects.map((project, index) => (
            <ProjectCard
              key={`project-${project.name || project.source_code_link || index}`}
              index={index}
              {...project}
              onSelectTech={onSelectTech}
            />
          ))
        )}
      </div>
    </>
  )
}

export default SectionWrapper(Projects, 'projects')
