import assert from 'node:assert/strict'
import test from 'node:test'

import { slideIn, staggerContainer, textVariant } from './motionVariants.js'

test('text rises into place after the delay it was given', () => {
  const variants = textVariant(0.4)

  assert.equal(variants.hidden.opacity, 0)
  assert.equal(variants.show.opacity, 1)
  assert.equal(variants.show.y, 0)
  assert.equal(variants.show.transition.delay, 0.4)
})

test('text needs no delay to be usable', () => {
  assert.equal(textVariant().show.transition.delay, 0)
})

test('a slide starts off-screen on the side it slides in from', () => {
  assert.deepEqual(slideIn('left', 'tween', 0.2, 1).hidden, { x: '-100%', y: 0 })
  assert.deepEqual(slideIn('right', 'tween', 0.2, 1).hidden, { x: '100%', y: 0 })
  assert.deepEqual(slideIn('up', 'tween', 0.2, 1).hidden, { x: 0, y: '100%' })
})

test('an unknown direction slides in from where it already is', () => {
  assert.deepEqual(slideIn('sideways', 'tween', 0.2, 1).hidden, { x: 0, y: 0 })
})

test('a slide carries the timing it was configured with', () => {
  const { transition } = slideIn('left', 'tween', 0.2, 1).show

  assert.deepEqual(transition, { type: 'tween', delay: 0.2, duration: 1, ease: 'easeOut' })
})

test('a stagger container passes its cadence to its children', () => {
  assert.deepEqual(staggerContainer(0.1, 0.3).show.transition, {
    staggerChildren: 0.1,
    delayChildren: 0.3,
  })
  assert.equal(staggerContainer(0.1).show.transition.delayChildren, 0)
})
