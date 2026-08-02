import { LazyMotion, domAnimation } from 'motion/react'
import { Suspense, lazy, useEffect, useState } from 'react'

import Background from './components/Background'
import Contact from './components/Contact'
import Experience from './components/Experience'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import Section from './components/Section'
import Skills from './components/Skills'
import { isWebGLAvailable } from './platform/webgl'
import { navigateToSection } from './platform/sectionNavigation'
import { scheduleDeferredChunkWarmUp } from './platform/deferredChunks'
import useDeferredChunksReady from './hooks/useDeferredChunksReady'
import useHashScrollSettling from './hooks/useHashScrollSettling'
import useMountWhenNear from './hooks/useMountWhenNear'

const StarsCanvas = lazy(() => import('./components/canvas/StarsCanvas'))

const SKILLS_SECTION_ID = 'skills'
const NO_TECH = ''
const STARS_MOUNT_MARGIN = '1400px'

const App = () => {
  const [selectedTech, setSelectedTech] = useState(NO_TECH)
  const [setStarsNode, starsNear] = useMountWhenNear(STARS_MOUNT_MARGIN)
  const chunksReady = useDeferredChunksReady()

  useHashScrollSettling()
  useEffect(scheduleDeferredChunkWarmUp, [])

  const selectTechAndRevealSkills = techName => {
    setSelectedTech(techName)

    requestAnimationFrame(() => {
      requestAnimationFrame(() => navigateToSection(SKILLS_SECTION_ID))
    })
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className='relative z-0 bg-black'>
        <div
          id='home'
          className='relative overflow-hidden bg-cover bg-no-repeat bg-center min-h-[100svh]'
        >
          <Navbar />
          <Hero />
          <Background />
          <Footer />
        </div>

        <Section id='work'>
          <Experience />
        </Section>

        <Section id='projects'>
          <Projects onSelectTech={selectTechAndRevealSkills} />
        </Section>

        <Section id={SKILLS_SECTION_ID}>
          <Skills selectedTech={selectedTech} onSelectTech={setSelectedTech} />
        </Section>

        <div className='relative z-0' ref={setStarsNode}>
          <Section id='contact'>
            <Contact />
          </Section>
          {isWebGLAvailable && (starsNear || chunksReady) && (
            <Suspense fallback={null}>
              <StarsCanvas />
            </Suspense>
          )}
        </div>
      </div>
    </LazyMotion>
  )
}

export default App
