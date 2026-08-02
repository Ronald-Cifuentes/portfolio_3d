import Tilt from 'react-parallax-tilt'

import { onActivationKey } from '../../lib/keyboardActivation'
import { t } from '../../lib/i18n'

const TILT_MAX_ANGLE_DEGREES = 45
const TILT_TRANSITION_SPEED_MS = 450

const CategoryCard = ({ title, icon, isSelected, index, onSelect }) => {
  const tooltip = isSelected ? t('tech.backToCategories') : t('tech.exploreCategory', { title })

  return (
    <div
      className='service-card-wrapper xs:w-[250px] w-full cursor-pointer disable-select'
      style={{ '--i': index }}
      data-selected={isSelected ? 'true' : 'false'}
    >
      <Tilt
        tiltMaxAngleX={TILT_MAX_ANGLE_DEGREES}
        tiltMaxAngleY={TILT_MAX_ANGLE_DEGREES}
        scale={1}
        transitionSpeed={TILT_TRANSITION_SPEED_MS}
        className='w-full h-full'
      >
        <div
          role='button'
          tabIndex={0}
          aria-label={t('tech.showSkills', { title })}
          aria-pressed={isSelected}
          className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card cursor-pointer service-card'
          data-tooltip={tooltip}
          onClick={onSelect}
          onKeyDown={onActivationKey(onSelect)}
        >
          <div className='card-skill bg-tertiary rounded-[20px] py-5 px-12 min-h-[200px] flex justify-evenly items-center flex-col'>
            <img src={icon} alt='' aria-hidden='true' className='w-16 h-16 object-contain' />
            <h3 className='text-white text-[20px] font-bold text-center'>{title}</h3>
          </div>
        </div>
      </Tilt>
    </div>
  )
}

export default CategoryCard
