import { AnimatePresence, m } from 'motion/react'
import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'

import { t } from '../../lib/i18n'
import useBodyScrollLock from '../../hooks/useBodyScrollLock'
import useFocusTrap from '../../hooks/useFocusTrap'

const BACKDROP_VARIANTS = Object.freeze({
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
})

const PANEL_VARIANTS = Object.freeze({
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', damping: 26, stiffness: 260 },
  },
  exit: { opacity: 0, y: 20, scale: 0.98, transition: { duration: 0.16 } },
})

const SectionHeading = ({ children }) => (
  <h4 className='text-[12px] font-semibold uppercase tracking-[0.2em] text-secondary/70'>
    {children}
  </h4>
)

const ExperienceModal = ({ experience, onClose }) => {
  const panelRef = useRef(null)
  const closeButtonRef = useRef(null)
  const titleId = useId()
  const descriptionId = useId()
  const open = Boolean(experience)

  useBodyScrollLock(open)
  useFocusTrap(open, panelRef, closeButtonRef)

  useEffect(() => {
    if (!open) return undefined

    const closeOnEscape = event => {
      if (event.key !== 'Escape') return

      event.preventDefault()
      onClose()
    }

    document.addEventListener('keydown', closeOnEscape)

    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [open, onClose])

  return createPortal(
    <AnimatePresence>
      {open && (
        <m.div
          className='fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6'
          variants={BACKDROP_VARIANTS}
          initial='hidden'
          animate='visible'
          exit='exit'
          onMouseDown={event => {
            if (event.target === event.currentTarget) onClose()
          }}
        >
          <div className='absolute inset-0 bg-black/75 backdrop-blur-sm' aria-hidden='true' />

          <m.div
            ref={panelRef}
            role='dialog'
            aria-modal='true'
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            className='relative z-10 flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#100d25] shadow-[0_35px_120px_-15px_rgba(0,0,0,0.9)]'
            variants={PANEL_VARIANTS}
            initial='hidden'
            animate='visible'
            exit='exit'
          >
            <span
              aria-hidden='true'
              className='pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#915EFF]/25 to-transparent'
            />

            <button
              ref={closeButtonRef}
              type='button'
              onClick={onClose}
              aria-label={t('experience.modalClose')}
              className='absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-lg leading-none text-white/80 transition-colors hover:bg-white/15 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#915EFF]'
            >
              ✕
            </button>

            <div className='relative overflow-y-auto px-6 py-8 sm:px-9 sm:py-9'>
              <div className='flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5'>
                <div
                  className='flex h-32 w-32 shrink-0 items-center justify-center rounded-3xl'
                  style={{ background: experience.iconBg }}
                >
                  <img
                    src={experience.icon}
                    alt={experience.companyName}
                    className='h-[62%] w-[62%] object-contain'
                  />
                </div>

                <div className='min-w-0 pr-8'>
                  <h3 id={titleId} className='text-[22px] font-bold leading-tight text-white'>
                    {experience.title}
                  </h3>
                  <p className='mt-1 text-[16px] font-semibold text-[#b39bff]'>
                    {experience.companyName}
                  </p>
                  <div className='mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[13px] text-secondary/80'>
                    <span>{experience.date}</span>
                    {experience.location && (
                      <span className='before:mr-3 before:content-["•"]'>
                        {experience.location}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {experience.summary && (
                <p
                  id={descriptionId}
                  className='mt-6 text-[15px] leading-relaxed text-white-100/90'
                >
                  {experience.summary}
                </p>
              )}

              {experience.points?.length > 0 && (
                <div className='mt-7'>
                  <SectionHeading>{t('experience.modalHighlights')}</SectionHeading>
                  <ul className='mt-3 space-y-3'>
                    {experience.points.map(point => (
                      <li key={point} className='flex gap-3'>
                        <span
                          aria-hidden='true'
                          className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#915EFF]'
                        />
                        <span className='text-[14.5px] leading-relaxed text-white-100/90'>
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {experience.technologies?.length > 0 && (
                <div className='mt-7'>
                  <SectionHeading>{t('experience.modalTech')}</SectionHeading>
                  <ul className='mt-3 flex flex-wrap gap-2'>
                    {experience.technologies.map(tech => (
                      <li
                        key={tech}
                        className='rounded-full border border-[#915EFF]/30 bg-[#915EFF]/10 px-3 py-1 text-[12.5px] font-medium text-[#c9b8ff]'
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default ExperienceModal
