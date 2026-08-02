import { Suspense, lazy, useState } from 'react'
import { m } from 'motion/react'

import { isWebGLAvailable } from '../../platform/webgl'
import { sendContactMessage } from '../../platform/contactMailer'
import { slideIn } from '../../lib/motionVariants'
import { styles } from '../../styles'
import { t } from '../../lib/i18n'
import useDeferredChunksReady from '../../hooks/useDeferredChunksReady'
import useMountWhenNear from '../../hooks/useMountWhenNear'

const EarthCanvas = lazy(() => import('../canvas/EarthCanvas'))

const EMPTY_FORM = Object.freeze({ name: '', email: '', message: '' })

const DELIVERY = Object.freeze({
  IDLE: 'idle',
  SENDING: 'sending',
  SENT: 'sent',
  FAILED: 'failed',
})

const FIELD_CLASSNAME =
  'bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'

const Field = ({ id, label, children }) => (
  <label className='flex flex-col' htmlFor={id}>
    <span className='text-white font-medium mb-4'>{label}</span>
    {children}
  </label>
)

const DeliveryStatus = ({ delivery }) => (
  <p role='status' aria-live='polite' className='text-[14px] text-secondary min-h-[20px]'>
    {delivery === DELIVERY.SENT && t('contact.success')}
    {delivery === DELIVERY.FAILED && t('contact.error')}
  </p>
)

const Contact = ({ sendMessage = sendContactMessage }) => {
  const [setEarthNode, earthNear] = useMountWhenNear()
  const chunksReady = useDeferredChunksReady()
  const [form, setForm] = useState(EMPTY_FORM)
  const [delivery, setDelivery] = useState(DELIVERY.IDLE)

  const updateField = event => {
    const { name, value } = event.target
    setForm(current => ({ ...current, [name]: value }))
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setDelivery(DELIVERY.SENDING)

    try {
      await sendMessage(form)
      setForm(EMPTY_FORM)
      setDelivery(DELIVERY.SENT)
    } catch {
      setDelivery(DELIVERY.FAILED)
    }
  }

  return (
    <div className='xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden'>
      <m.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className='flex-[0.75] p-8 rounded-2xl bg-[#111]'
      >
        <p className={styles.sectionSubText}>{t('contact.subheading')}</p>
        <h3 className={styles.sectionHeadText}>{t('contact.heading')}</h3>

        <form onSubmit={handleSubmit} className='mt-12 flex flex-col gap-8'>
          <Field id='contact-name' label={t('contact.nameLabel')}>
            <input
              id='contact-name'
              type='text'
              name='name'
              value={form.name}
              onChange={updateField}
              placeholder={t('contact.namePlaceholder')}
              className={FIELD_CLASSNAME}
            />
          </Field>

          <Field id='contact-email' label={t('contact.emailLabel')}>
            <input
              id='contact-email'
              type='email'
              name='email'
              value={form.email}
              onChange={updateField}
              placeholder={t('contact.emailPlaceholder')}
              className={FIELD_CLASSNAME}
            />
          </Field>

          <Field id='contact-message' label={t('contact.messageLabel')}>
            <textarea
              id='contact-message'
              rows={7}
              name='message'
              value={form.message}
              onChange={updateField}
              placeholder={t('contact.messagePlaceholder')}
              className={FIELD_CLASSNAME}
            />
          </Field>

          <DeliveryStatus delivery={delivery} />

          <button
            type='submit'
            disabled={delivery === DELIVERY.SENDING}
            className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary disabled:opacity-60'
          >
            {delivery === DELIVERY.SENDING ? t('contact.sending') : t('contact.send')}
          </button>
        </form>
      </m.div>

      <m.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
        ref={setEarthNode}
      >
        {isWebGLAvailable && (earthNear || chunksReady) && (
          <Suspense fallback={null}>
            <EarthCanvas />
          </Suspense>
        )}
      </m.div>
    </div>
  )
}

export default Contact
