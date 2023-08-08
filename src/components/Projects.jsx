import React from 'react'
import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion'

import { styles } from '../styles'
import { github } from '../assets'
import { SectionWrapper } from '../hoc'
import { projects } from '../constants'
import { fadeIn, textVariant } from '../utils/motion'

const ProjectCard = ({ index, name, tags, image, source_code_link }) => {
  return (
    <motion.div
      variants={fadeIn('up', 'spring', index * 0.1, 0.75)}
      onClick={() => window.open(source_code_link, '_blank')}
      className='cursor-pointer w-full'
    >
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
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
            <p key={`${name}-${tag.name}`} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  )
}

const Projects = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          Following projects showcases my skills and experience through real-world examples of my
          work. Each project is briefly described with links to code repositories and live demos in
          it. It reflects my ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      <div className='mt-10 auto-grid-projects scroll-zone disable-select'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  )
}

export default SectionWrapper(Projects, 'projects')
