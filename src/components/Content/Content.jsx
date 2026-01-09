// import { control, control1, control2, control3 } from '../../assets'
import './Content.css'

import { ComputersCanvas } from '../canvas'
import React from 'react'
import { styles } from '../../styles'

const Content = () => {
  return (
    <section className={`absolute z-10 w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px] ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'></div>
        <div className='w-1 h-52 rainbow-bg' />

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className='rainbow-text'>Ronald</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            Tech Lead | Sr React Developer | Sr Frontend | UX / UI | Sr Backend | Sr Nodejs | Sr
            Python | Web3 | Javascript | Mobile | Data Scientist | Machine Learning
          </p>
        </div>
      </div>

      <ComputersCanvas />
    </section>
  )
}

export default Content
