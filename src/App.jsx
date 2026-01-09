import {
  Contact,
  Content,
  Experience,
  Navbar,
  Projects,
  Skills,
  StarsCanvas,
  Tech,
} from './components'

import Background from './components/Background/Background'
import { BrowserRouter } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import React from 'react'

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-black'>
        <div className='bg-cover bg-no-repeat bg-center' style={{ height: '850px' }}>
          <Navbar />
          <Content />
          <Background />
          <Footer />
        </div>

        <Experience />
        <Skills />
        <Tech />
        <Projects />
        <div className='relative z-0'>
          <Contact />
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
