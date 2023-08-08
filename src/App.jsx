import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import {
  Skills,
  Contact,
  Experience,
  Content,
  Navbar,
  Tech,
  Projects,
  StarsCanvas,
} from './components'
import Background from './components/Background/Background'
import Footer from './components/Footer/Footer'

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
