import React from 'react'

import { motion } from 'framer-motion'

import { styles } from '../../styles'
import { SectionWrapper } from '../../hoc'
import { fadeIn, textVariant } from '../../utils/motion'
import './Skills.css'

const Text = [
  `I am an experienced software developer with knowledge in different Backend and Frontend technologies, such as React, Angular, Vue and Svelte. I have skills for UX/UI design, using version control, creating responsive designs and working with different editors and shortcuts. I also have knowledge of Prompt Engineering which is the process of creating effective Prompts for artificial intelligence models.`,
  `On the backend side, I can develop applications using JavaScript, C, C++, C#, Java, Python and PHP. I am familiar with different frameworks, libraries and tools for each language. I can also work with various databases, such as SQLServer, MongoDB, Firebase and others. I know how to implement and manage applications on cloud platforms, such as Azure, AWS and Google Cloud. I also follow best practices for testing and security, such as unit testing, integration testing, code analysis, encryption, authentication and authorization.`,
  `I am passionate about learning new technologies and solving challenging problems. I have a strong work ethic and a collaborative attitude. I am always looking for opportunities to improve my skills and contribute to the success of the projects I work on. Let's work together to bring your ideas to life!`,
]

const Skills = () => {
  return (
    <div className='flex flex-col items-center gradient-box'>
      <motion.div variants={textVariant()}>
        <h2 className={styles.sectionHeadText}>Skills and Technologies.</h2>
      </motion.div>
      <motion.p
        variants={fadeIn('', '', 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        {Text[0]}
      </motion.p>
      <motion.p
        variants={fadeIn('', '', 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        {Text[1]}
      </motion.p>
      <motion.p
        variants={fadeIn('', '', 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        {Text[2]}
      </motion.p>
    </div>
  )
}

export default SectionWrapper(Skills, 'skills')
