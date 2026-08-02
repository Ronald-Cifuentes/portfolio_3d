import assert from 'node:assert/strict'
import test from 'node:test'

import { NO_VISIBLE_SECTION, mostVisibleSectionId } from './activeSection.js'

test('picks the section covering most of the viewport', () => {
  const ratios = new Map([
    ['home', 0.1],
    ['work', 0.75],
    ['projects', 0.4],
  ])

  assert.equal(mostVisibleSectionId(ratios), 'work')
})

test('keeps the first section on a tie, so the highlight does not flicker', () => {
  const ratios = new Map([
    ['work', 0.5],
    ['projects', 0.5],
  ])

  assert.equal(mostVisibleSectionId(ratios), 'work')
})

test('reports no section when nothing is visible at all', () => {
  assert.equal(mostVisibleSectionId(new Map()), NO_VISIBLE_SECTION)
  assert.equal(mostVisibleSectionId(new Map([['home', 0]])), NO_VISIBLE_SECTION)
})
