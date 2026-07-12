import './Content.css'

import { ComputersCanvas } from '../canvas'
import React from 'react'
import { styles } from '../../styles'

const Content = () => {
  return (
    <section className='absolute inset-0 z-10 w-full h-full'>
      <div
        className={`absolute inset-0 top-[96px] sm:top-[120px] ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'></div>
        <div className='w-3 h-52 rainbow-bg' />

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className='rainbow-text'>Ronald</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            Tech Lead | Sr React Developer | Sr Frontend | UX / UI | Sr Backend | Sr Nodejs | Sr
            Python | Web3 | Javascript | Mobile | Data Scientist | Machine Learning | AI |
            Cryptocurrencies
          </p>
        </div>
      </div>

      <ComputersCanvas />
    </section>
  )
}

export default Content
