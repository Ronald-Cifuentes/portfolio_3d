import { BrowserRouter, useLocation } from 'react-router-dom'
import { Contact, Content, Experience, Navbar, Projects, StarsCanvas, Skills } from './components'
import React, { useEffect, useRef, useState } from 'react'

import Background from './components/Background/Background'
import Footer from './components/Footer/Footer'
import { t } from './utils/i18n'

const ScrollToHash = () => {
  const location = useLocation()

  useEffect(() => {
    const hash = location.hash?.replace('#', '')
    if (!hash) return

    const id = decodeURIComponent(hash)
    const scroll = () => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' })
    }

    let raf1 = 0
    let raf2 = 0
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(scroll)
    })

    return () => {
      if (raf1) cancelAnimationFrame(raf1)
      if (raf2) cancelAnimationFrame(raf2)
    }
  }, [location.hash])

  return null
}

const App = () => {
  const ytBgRef = useRef(null)


  return (
    <BrowserRouter>
      <ScrollToHash />
      <div className='relative z-0 bg-black'>
        <div
          id='home'
          className='relative overflow-hidden bg-cover bg-no-repeat bg-center min-h-[100svh]'
        >
          <Navbar />
          <Content />
          <Background ytRef={ytBgRef} />
          <div className='ytbg__controls ytbg__controls--overlay' aria-hidden={false}>
            <button
              className='ytbg__btn ytbg__btn--prev'
              type='button'
              onClick={() => ytBgRef.current?.prev?.()}
              aria-label={t('background.previousVideo')}
            >
              ‹
            </button>
            <button
              className='ytbg__btn ytbg__btn--next'
              type='button'
              onClick={() => ytBgRef.current?.next?.()}
              aria-label={t('background.nextVideo')}
            >
              ›
            </button>
          </div>
          <Footer />
        </div>

        <Experience />

        <Projects  />

        <Skills />

        <div className='relative z-0'>
          <Contact />
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
