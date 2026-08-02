import { cx } from '../../lib/classNames'
import { onActivationKey } from '../../lib/keyboardActivation'
import { t } from '../../lib/i18n'

const TechCard = ({ name, icon, isActive, index, onToggle }) => {
  const label = isActive ? t('tech.clearFilter') : t('tech.filterByTech', { name })
  const isUnknownTech = !icon

  return (
    <div
      role='button'
      tabIndex={0}
      className={cx(
        'card-container',
        isActive && 'card-container--active',
        isUnknownTech && 'card-container--orphan'
      )}
      onClick={onToggle}
      onKeyDown={onActivationKey(onToggle)}
      aria-pressed={isActive}
      aria-label={label}
      data-tooltip={label}
      data-selected={isActive ? 'true' : 'false'}
      style={{ '--i': index }}
    >
      <div className='card'>
        <div className={cx('card2', isUnknownTech && 'card2--orphan')}>
          {isUnknownTech ? (
            <span className='orphan-label'>{name}</span>
          ) : (
            <img className='max-h-full' src={icon} alt='' aria-hidden='true' />
          )}
        </div>
      </div>
      <span>{name}</span>
    </div>
  )
}

export default TechCard
