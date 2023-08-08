import React from 'react'
import { styles } from '../../styles'
import { ComputersCanvas } from '../canvas'
// import { control, control1, control2, control3 } from '../../assets'
import './Content.css'

const Content = () => {
  return (
    <section className={`absolute z-10 w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'></div>
        <div className='w-1 h-52 rainbow-bg' />

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className='rainbow-text'>Ronald</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            Web Developer, Designer UX / UI <br className='sm:block hidden' />
            Web3, Javascript Specialist
          </p>
        </div>
      </div>

      <ComputersCanvas />

      {/* <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <div className='icon-container'>
          <img src={control1} />
          <img src={control2} />
        </div>
      </div> */}
    </section>
  )
}

export default Content
