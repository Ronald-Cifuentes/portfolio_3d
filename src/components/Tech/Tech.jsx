import React, { useState } from 'react'
import { SectionWrapper } from '../../hoc'
import { Tilt } from 'react-tilt'
import {
  BackendDeveloper,
  ControlVersions,
  Databases,
  DeploymentAndCloud,
  DesignerUXUI,
  EditorsAndShortcuts,
  FrontendDeveloper,
  Methodologies,
  PromptEnginering,
  TestingAndSecurity,
  Web3,
  WebLayout,
} from '../../constants'
import { services } from '../../constants'
import './Tech.css'
import { method } from '../../assets'

const ServiceCard = ({ index, title, icon, setShow }) => (
  <Tilt className='xs:w-[250px] w-full cursor-pointer disable-select'>
    <div
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
      onClick={() => setShow(prev => (prev !== title ? title : ''))}
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='card-skill bg-tertiary rounded-[20px] py-5 px-12 min-h-[200px] flex justify-evenly items-center flex-col'
      >
        <img src={icon} alt='web-development' className='w-16 h-16 object-contain' />

        <h3 className='text-white text-[20px] font-bold text-center'>{title}</h3>
      </div>
    </div>
  </Tilt>
)

const ContentSkills = props => {
  return (
    <div className='card-container'>
      <div className='card'>
        <div className='card2'>
          <img className='max-h-full' src={props.tech.icon} alt='' />
        </div>
      </div>
      <span>{props.tech.name}</span>
    </div>
  )
}

const Technologies = {
  Methodologies: Methodologies,
  'Control Versions': ControlVersions,
  'Web Layout': WebLayout,
  'Frontend Developer': FrontendDeveloper,
  'Backend Developer': BackendDeveloper,
  'Designer UX/UI': DesignerUXUI,
  'Web 3': Web3,
  'Editors And Shortcuts': EditorsAndShortcuts,
  'Prompt Enginering': PromptEnginering,
  'Data Bases': Databases,
  'Deployment & Cloud': DeploymentAndCloud,
  'Testing and Security': TestingAndSecurity,
}

const Tech = ({ dataTestId = 'tech' }) => {
  const [show, setShow] = useState('')

  const items = services.filter(item => item.title === show)
  const itemsComputed = items.length !== 0 ? items : services

  return (
    <div>
      <div className=' flex flex-wrap gap-10 justify-center'>
        {itemsComputed.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...{ ...service, setShow }} />
        ))}
      </div>

      {show !== '' && (
        <div data-testid={dataTestId} className='auto-grid'>
          {Technologies[show].map((tech, ind) => (
            <ContentSkills key={`skill-card-${ind}`} tech={tech} />
          ))}
        </div>
      )}
    </div>
  )
}

export default SectionWrapper(Tech, '')
