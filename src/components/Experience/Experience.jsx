import 'react-vertical-timeline-component/style.min.css'
import '../shared/reveal-animations.css'
import './Experience.css'

import { useCallback, useState } from 'react'
import { VerticalTimeline } from 'react-vertical-timeline-component'
import { m } from 'motion/react'

import { EXPERIENCES } from '../../constants'
import ExperienceCard from './ExperienceCard'
import ExperienceModal from './ExperienceModal'
import { styles } from '../../styles'
import { t } from '../../lib/i18n'
import { textVariant } from '../../lib/motionVariants'

const Experience = () => {
  const [selectedExperience, setSelectedExperience] = useState(null)
  const closeModal = useCallback(() => setSelectedExperience(null), [])

  return (
    <>
      <m.div variants={textVariant()} initial='hidden' animate='show'>
        <h2 className={`${styles.sectionHeadText} text-center`}>{t('experience.heading')}</h2>
      </m.div>

      <div className='experience-timeline mt-20 flex flex-col'>
        <VerticalTimeline>
          {EXPERIENCES.map((experience, index) => (
            <ExperienceCard
              key={`${experience.companyName}-${experience.title}`}
              experience={experience}
              index={index}
              onSelect={setSelectedExperience}
            />
          ))}
        </VerticalTimeline>
      </div>

      <ExperienceModal experience={selectedExperience} onClose={closeModal} />
    </>
  )
}

export default Experience
