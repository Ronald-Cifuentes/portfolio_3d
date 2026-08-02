const TEXT_ENTER_OFFSET_PX = -50
const TEXT_SPRING_DURATION_S = 1.25
const NO_STAGGER_DELAY = 0

export const textVariant = (delay = 0) =>
  Object.freeze({
    hidden: { y: TEXT_ENTER_OFFSET_PX, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', duration: TEXT_SPRING_DURATION_S, delay },
    },
  })

const OFF_SCREEN_BY_AXIS = Object.freeze({
  left: { x: '-100%', y: 0 },
  right: { x: '100%', y: 0 },
  up: { x: 0, y: '100%' },
  down: { x: 0, y: '100%' },
})

const CENTRED = Object.freeze({ x: 0, y: 0 })

export const slideIn = (direction, type, delay, duration) =>
  Object.freeze({
    hidden: OFF_SCREEN_BY_AXIS[direction] ?? CENTRED,
    show: {
      ...CENTRED,
      transition: { type, delay, duration, ease: 'easeOut' },
    },
  })

export const staggerContainer = (staggerChildren, delayChildren = NO_STAGGER_DELAY) =>
  Object.freeze({
    hidden: {},
    show: { transition: { staggerChildren, delayChildren } },
  })
