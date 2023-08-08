import React from 'react'
import './Footer.css'
import { List } from './Footer.const'

const Footer = () => {
  return (
    <section className='footer-container'>
      <ul className='social'>
        {List.map((item, ind) => (
          <li key={`item-${ind}`}>
            <a target='_black' href={item.link}>
              {item.icon}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Footer
