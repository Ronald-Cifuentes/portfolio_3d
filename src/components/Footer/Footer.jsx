import './Footer.css'

import { SOCIAL_LINKS } from './socialLinks'
import { t } from '../../lib/i18n'

const Footer = () => (
  <section className='footer-container'>
    <ul className='social'>
      {SOCIAL_LINKS.map(({ network, url, Icon }) => (
        <li key={network}>
          <a
            href={url}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={t('footer.socialLinkLabel', { network })}
          >
            <Icon aria-hidden='true' focusable='false' />
          </a>
        </li>
      ))}
    </ul>
  </section>
)

export default Footer
