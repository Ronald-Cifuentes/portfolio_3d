import assert from 'node:assert/strict'
import test from 'node:test'

import { loopedSlides, slideKey, symmetricNeighbourRadius } from './carousel.js'

test('repeats the items in whole passes until the loop minimum is reached', () => {
  const slides = loopedSlides(['a', 'b', 'c', 'd'], 16)

  assert.equal(slides.length, 16)
  assert.deepEqual(slides[0], { item: 'a', pass: 0 })
  assert.deepEqual(slides[4], { item: 'a', pass: 1 })
  assert.deepEqual(slides.at(-1), { item: 'd', pass: 3 })
})

test('rounds passes up so the minimum is never undershot', () => {
  assert.equal(loopedSlides(['a', 'b', 'c'], 16).length, 18)
})

test('a single item is never duplicated, because it cannot loop', () => {
  assert.deepEqual(loopedSlides(['only'], 16), [{ item: 'only', pass: 0 }])
  assert.deepEqual(loopedSlides([], 16), [])
})

test('keeps the visible window symmetric around the centre slide', () => {
  assert.equal(symmetricNeighbourRadius([-3, -2, -1, 0, 1, 2, 3], 3), 3)
  assert.equal(symmetricNeighbourRadius([-1, 0, 1, 2, 3], 3), 1)
  assert.equal(symmetricNeighbourRadius([0, 1, 2], 3), 0)
})

test('never shows more neighbours than the configured maximum', () => {
  assert.equal(symmetricNeighbourRadius([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5], 3), 3)
})

test('a slide key stays stable for the same item in the same pass', () => {
  const project = { name: 'Airlines', sourceCodeUrl: 'https://example.com' }

  assert.equal(slideKey(project, 2, 7), 'project-2-Airlines')
  assert.equal(
    slideKey({ sourceCodeUrl: 'https://example.com' }, 0, 7),
    'project-0-https://example.com'
  )
  assert.equal(slideKey({}, 0, 7), 'project-0-7')
})
