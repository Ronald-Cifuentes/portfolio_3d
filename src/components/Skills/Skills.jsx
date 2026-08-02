import './Skills.css'

import {
  BackendDeveloper,
  ControlVersions,
  Databases,
  DeploymentAndCloud,
  DesignerUXUI,
  EditorsAndShortcuts,
  FrontendDeveloper,
  Methodologies,
  PromptEnginering,
  TestingAndSecurity,
  Web3,
  WebLayout,
  services,
} from '../../constants'
import React, { useRef, useState } from 'react'

import ProjectShowcase from '../ProjectShowcase'
import { SectionWrapper } from '../../hoc'
import Tilt from 'react-parallax-tilt'
import { techNamesMatchExact } from '../../utils/techFilter'
import { t } from '../../utils/i18n'
import { motion } from 'motion/react'
import { textVariant } from '../../utils/motion'
import { styles } from '../../styles'

const Technologies = {
  Methodologies: Methodologies,
  'Control Versions': ControlVersions,
  'Web Layout': WebLayout,
  'Frontend Developer': FrontendDeveloper,
  'Backend Developer': BackendDeveloper,
  'Designer UX/UI': DesignerUXUI,
  'Web 3': Web3,
  'Editors And Shortcuts': EditorsAndShortcuts,
  'AI & Machine Learning': PromptEnginering,
  'Data Bases': Databases,
  'Deployment & Cloud': DeploymentAndCloud,
  'Testing and Security': TestingAndSecurity,
}

const findCategoryAndTechExact = techName => {
  for (const [categoryTitle, techs] of Object.entries(Technologies)) {
    const matchingTech = techs.find(tech => techNamesMatchExact(tech.name, techName))
    if (matchingTech) {
      return { category: categoryTitle, tech: matchingTech }
    }
  }
  return null
}

const ServiceCard = ({ index, title, icon, isSelected, stage, onClick }) => {
  const tooltipText = isSelected ? t('tech.backToCategories') : t('tech.exploreCategory', { title })

  return (
    <div
      className='service-card-wrapper xs:w-[250px] w-full cursor-pointer disable-select'
      style={{ '--i': index }}
      data-selected={isSelected ? 'true' : 'false'}
    >
      <Tilt
        tiltMaxAngleX={45}
        tiltMaxAngleY={45}
        scale={1}
        transitionSpeed={450}
        className='w-full h-full'
      >
        <div
          role='button'
          tabIndex={0}
          aria-label={t('tech.showSkills', { title })}
          aria-pressed={isSelected}
          className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card cursor-pointer service-card'
          data-tooltip={tooltipText}
          onClick={onClick}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onClick()
            }
          }}
        >
          <div className='card-skill bg-tertiary rounded-[20px] py-5 px-12 min-h-[200px] flex justify-evenly items-center flex-col'>
            <img src={icon} alt='web-development' className='w-16 h-16 object-contain' />
            <h3 className='text-white text-[20px] font-bold text-center'>{title}</h3>
          </div>
        </div>
      </Tilt>
    </div>
  )
}

const ContentSkills = ({ tech, isActive, onClick, index }) => {
  const tooltipText = isActive ? t('tech.clearFilter') : t('tech.filterByTech', { name: tech.name })

  return (
    <div
      className={`card-container ${isActive ? 'card-container--active' : ''}`}
      role='button'
      tabIndex={0}
      onClick={onClick}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') onClick()
      }}
      aria-pressed={isActive}
      aria-label={isActive ? t('tech.clearFilter') : t('tech.filterByTech', { name: tech.name })}
      data-tooltip={tooltipText}
      data-selected={isActive ? 'true' : 'false'}
      style={{ '--i': index }}
    >
      <div className='card'>
        <div className='card2'>
          <img className='max-h-full' src={tech.icon} alt='' />
        </div>
      </div>
      <span>{tech.name}</span>
    </div>
  )
}

const OrphanTechCard = ({ techName, onClick, index }) => {
  const tooltipText = t('tech.clearFilter')

  return (
    <div
      className='card-container card-container--active card-container--orphan'
      role='button'
      tabIndex={0}
      onClick={onClick}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') onClick()
      }}
      aria-pressed={true}
      aria-label={t('tech.clearFilter')}
      data-tooltip={tooltipText}
      data-selected='true'
      style={{ '--i': index }}
    >
      <div className='card'>
        <div className='card2 card2--orphan'>
          <span className='orphan-label'>{techName}</span>
        </div>
      </div>
      <span>{techName}</span>
    </div>
  )
}

const Tech = ({ dataTestId = 'tech'}) => {
  const [show, setShow] = useState('')
  const lastCategoryRef = useRef('')
  const lastProjectsRef = useRef([])

  const [selectedTech, setSelectedTech] = useState('')

  const exactMatch = selectedTech ? findCategoryAndTechExact(selectedTech) : null
  const derivedCategory = exactMatch?.category || null
  const effectiveShow = derivedCategory || show
  const isOrphanTech = Boolean(selectedTech && !exactMatch)

  if (effectiveShow && effectiveShow !== lastCategoryRef.current) {
    lastCategoryRef.current = effectiveShow
  }
  const mountedCategory = effectiveShow || lastCategoryRef.current

  const stage = selectedTech ? 'tech' : effectiveShow ? 'category' : 'idle'

  const handleServiceClick = title => {
    if (stage === 'tech') {
      return
    }
    if (show === title) {
      setShow('')
      setSelectedTech?.('')
    } else {
      setShow(title)
      setSelectedTech?.('')
    }
  }

  const handleTechClick = techName => {
    if (selectedTech && techNamesMatchExact(techName, selectedTech)) {
      setSelectedTech?.('')
    } else {
      setSelectedTech?.(techName)
    }
  }

  const handleOrphanClick = () => {
    setSelectedTech?.('')
    setShow('')
  }

  const techs = mountedCategory ? Technologies[mountedCategory] || [] : []

  return (
    <div>
      <motion.div variants={textVariant()} initial='hidden' animate='show'>
        <h2 className={`${styles.sectionHeadText} text-center`}>{t('skills.heading')}</h2>
      </motion.div>

      <div className='flex flex-wrap gap-10 justify-center service-cards-row mt-16' data-stage={stage}>
        {services.map((service, index) => {
          const isSelected = effectiveShow === service.title
          return (
            <ServiceCard
              key={service.title}
              index={index}
              title={service.title}
              icon={service.icon}
              isSelected={isSelected}
              stage={stage}
              onClick={() => handleServiceClick(service.title)}
            />
          )
        })}
      </div>

      <div
        data-testid={dataTestId}
        className='auto-grid tech-grid'
        data-stage={stage}
        data-visible={mountedCategory || isOrphanTech ? 'true' : 'false'}
      >
        {isOrphanTech ? (
          <OrphanTechCard techName={selectedTech} onClick={handleOrphanClick} index={0} />
        ) : (
          techs.map((tech, ind) => {
            const isActive = Boolean(selectedTech && techNamesMatchExact(tech.name, selectedTech))
            return (
              <ContentSkills
                key={`skill-card-${ind}`}
                tech={tech}
                isActive={isActive}
                onClick={() => handleTechClick(tech.name)}
                index={ind}
              />
            )
          })
        )}
      </div>

      <ProjectShowcase
        selectedTech={selectedTech}
        setSelectedTech={setSelectedTech}
        lastProjectsRef={lastProjectsRef}
      />
    </div>
  )
}

export default SectionWrapper(Tech, '')
