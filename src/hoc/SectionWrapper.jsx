import { motion } from 'motion/react'
import { staggerContainer } from '../utils/motion'
import { styles } from '../styles'

const StarWrapper = (Component, idName) =>
  function HOC(props) {
    return (
      <motion.section
        variants={staggerContainer()}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.25 }}
        className={`${styles.padding} w-full relative z-0`}
      >
        <span className='hash-span' id={idName}>
          &nbsp;
        </span>
        <Component {...props} />
      </motion.section>
    )
  }

export default StarWrapper
