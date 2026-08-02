import './Skills.css'

import { useState } from 'react'
import { m } from 'motion/react'

import CategoryCard from './CategoryCard'
import ProjectShowcase from '../ProjectShowcase'
import { TECH_CATEGORIES } from '../../constants'
import TechCard from './TechCard'
import { findCategoryForTech, techsOfCategory } from '../../lib/techCategories'
import { styles } from '../../styles'
import { t } from '../../lib/i18n'
import { techNamesMatchExactly } from '../../lib/techMatching'
import { textVariant } from '../../lib/motionVariants'

const STAGE = Object.freeze({
  IDLE: 'idle',
  CATEGORY: 'category',
  TECH: 'tech',
})

const NO_CATEGORY = ''
const NO_TECH = ''

const stageFor = (selectedTech, categoryId) => {
  if (selectedTech) return STAGE.TECH
  if (categoryId) return STAGE.CATEGORY

  return STAGE.IDLE
}

const Skills = ({ selectedTech, onSelectTech }) => {
  const [openedCategoryId, setOpenedCategoryId] = useState(NO_CATEGORY)

  const matchedTech = findCategoryForTech(TECH_CATEGORIES, selectedTech)
  const activeCategoryId = matchedTech?.category.id ?? openedCategoryId
  const isUnknownTech = Boolean(selectedTech) && !matchedTech
  const stage = stageFor(selectedTech, activeCategoryId)

  const [mountedCategoryId, setMountedCategoryId] = useState(activeCategoryId)
  if (activeCategoryId && activeCategoryId !== mountedCategoryId) {
    setMountedCategoryId(activeCategoryId)
  }

  const toggleCategory = categoryId => {
    if (stage === STAGE.TECH) return

    setOpenedCategoryId(current => (current === categoryId ? NO_CATEGORY : categoryId))
    onSelectTech(NO_TECH)
  }

  const toggleTech = techName => {
    const alreadySelected = selectedTech && techNamesMatchExactly(techName, selectedTech)
    onSelectTech(alreadySelected ? NO_TECH : techName)
  }

  const clearUnknownTech = () => {
    onSelectTech(NO_TECH)
    setOpenedCategoryId(NO_CATEGORY)
  }

  const techs = techsOfCategory(TECH_CATEGORIES, mountedCategoryId)

  return (
    <div>
      <m.div variants={textVariant()} initial='hidden' animate='show'>
        <h2 className={`${styles.sectionHeadText} text-center`}>{t('skills.heading')}</h2>
      </m.div>

      <div
        className='flex flex-wrap gap-10 justify-center service-cards-row mt-16'
        data-stage={stage}
      >
        {TECH_CATEGORIES.map((category, index) => (
          <CategoryCard
            key={category.id}
            title={category.title}
            icon={category.icon}
            index={index}
            isSelected={activeCategoryId === category.id}
            onSelect={() => toggleCategory(category.id)}
          />
        ))}
      </div>

      <div
        data-testid='tech-grid'
        className='auto-grid tech-grid'
        data-stage={stage}
        data-visible={mountedCategoryId || isUnknownTech ? 'true' : 'false'}
      >
        {isUnknownTech ? (
          <TechCard name={selectedTech} isActive index={0} onToggle={clearUnknownTech} />
        ) : (
          techs.map((tech, index) => (
            <TechCard
              key={tech.name}
              name={tech.name}
              icon={tech.icon}
              index={index}
              isActive={Boolean(selectedTech && techNamesMatchExactly(tech.name, selectedTech))}
              onToggle={() => toggleTech(tech.name)}
            />
          ))
        )}
      </div>

      <ProjectShowcase selectedTech={selectedTech} onSelectTech={onSelectTech} />
    </div>
  )
}

export default Skills
