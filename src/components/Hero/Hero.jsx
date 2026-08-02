import './Hero.css'

import { styles } from '../../styles'
import { t } from '../../lib/i18n'

const Hero = () => (
  <section className='absolute inset-0 z-10 w-full h-full'>
    <div
      className={`absolute inset-0 top-[96px] sm:top-[120px] ${styles.paddingX} flex flex-row items-start gap-5`}
    >
      <div className='hero-title-wrapper ml-5 flex flex-row items-stretch gap-5'>
        <div className='w-2 shrink-0 rainbow-bg self-stretch' />
        <div className='control-title-home'>
          <h1 className={`${styles.heroHeadText} text-white`}>
            {t('hero.greeting')}
            <br />
            {t('hero.intro')} <span className='rainbow-text'>{t('hero.name')}</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>{t('hero.roles')}</p>
        </div>
      </div>
    </div>
  </section>
)

export default Hero
