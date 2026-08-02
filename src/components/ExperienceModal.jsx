import { AnimatePresence, motion } from 'motion/react'
import { t } from '../utils/i18n'
import React, { useCallback, useEffect, useId, useRef } from 'react'

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const panelVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', damping: 26, stiffness: 260 },
  },
  exit: { opacity: 0, y: 20, scale: 0.98, transition: { duration: 0.16 } },
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

const ExperienceModal = ({ experience, onClose }) => {
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const titleId = useId()
  const descId = useId()
  const open = Boolean(experience)

  const handleKeyDown = useCallback(
    event => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return

      const nodes = panelRef.current.querySelectorAll(FOCUSABLE)
      if (nodes.length === 0) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      const active = document.activeElement

      if (event.shiftKey && (active === first || active === panelRef.current)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (!open) return undefined

    const previouslyFocused = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    const raf = requestAnimationFrame(() => closeRef.current?.focus())

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      cancelAnimationFrame(raf)
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus()
    }
  }, [open, handleKeyDown])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className='fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6'
          variants={backdropVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
          onMouseDown={event => {
            if (event.target === event.currentTarget) onClose()
          }}
        >
          <div className='absolute inset-0 bg-black/75 backdrop-blur-sm' aria-hidden='true' />

          <motion.div
            ref={panelRef}
            role='dialog'
            aria-modal='true'
            aria-labelledby={titleId}
            aria-describedby={descId}
            className='relative z-10 flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#100d25] shadow-[0_35px_120px_-15px_rgba(0,0,0,0.9)]'
            variants={panelVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
          >
            <span
              aria-hidden='true'
              className='pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#915EFF]/25 to-transparent'
            />

            <button
              ref={closeRef}
              type='button'
              onClick={onClose}
              aria-label={t('experience.modalClose')}
              className='absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-lg leading-none text-white/80 transition-colors hover:bg-white/15 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#915EFF]'
            >
              ✕
            </button>

            <div className='relative overflow-y-auto px-6 py-8 sm:px-9 sm:py-9'>
              <div className='flex items-start gap-4'>
                <div
                  className='flex h-16 w-16 shrink-0 items-center justify-center rounded-xl'
                  style={{ background: experience.iconBg }}
                >
                  <img
                    src={experience.icon}
                    alt={experience.company_name}
                    className='h-[62%] w-[62%] object-contain'
                  />
                </div>

                <div className='min-w-0 pr-8'>
                  <h3 id={titleId} className='text-[22px] font-bold leading-tight text-white'>
                    {experience.title}
                  </h3>
                  <p className='mt-1 text-[16px] font-semibold text-[#b39bff]'>
                    {experience.company_name}
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
                <p id={descId} className='mt-6 text-[15px] leading-relaxed text-white-100/90'>
                  {experience.summary}
                </p>
              )}

              {experience.points?.length > 0 && (
                <div className='mt-7'>
                  <h4 className='text-[12px] font-semibold uppercase tracking-[0.2em] text-secondary/70'>
                    {t('experience.modalHighlights')}
                  </h4>
                  <ul className='mt-3 space-y-3'>
                    {experience.points.map((point, index) => (
                      <li key={`modal-point-${index}`} className='flex gap-3'>
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
                  <h4 className='text-[12px] font-semibold uppercase tracking-[0.2em] text-secondary/70'>
                    {t('experience.modalTech')}
                  </h4>
                  <ul className='mt-3 flex flex-wrap gap-2'>
                    {experience.technologies.map((tech, index) => (
                      <li
                        key={`modal-tech-${index}`}
                        className='rounded-full border border-[#915EFF]/30 bg-[#915EFF]/10 px-3 py-1 text-[12.5px] font-medium text-[#c9b8ff]'
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ExperienceModal
