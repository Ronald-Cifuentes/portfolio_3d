import { m } from 'motion/react'

import { staggerContainer } from '../../lib/motionVariants'
import { styles } from '../../styles'

const REVEAL_WHEN_A_QUARTER_VISIBLE = { once: true, amount: 0.25 }

const Section = ({ id, children }) => (
  <m.section
    variants={staggerContainer()}
    initial='hidden'
    whileInView='show'
    viewport={REVEAL_WHEN_A_QUARTER_VISIBLE}
    className={`${styles.padding} w-full relative z-0 section-shell`}
  >
    <span className='hash-span' id={id}>
      &nbsp;
    </span>
    {children}
  </m.section>
)

export default Section
