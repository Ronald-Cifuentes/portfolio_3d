import assert from 'node:assert/strict'
import test from 'node:test'

import { findCategoryForTech, techsOfCategory } from './techCategories.js'

const CATEGORIES = [
  { id: 'web-layout', title: 'Web Layout', techs: [{ name: 'Css' }, { name: 'Html' }] },
  { id: 'frontend', title: 'Frontend Developer', techs: [{ name: 'React JS' }, { name: 'Vue' }] },
]

test('finds the category that owns a tech, matching its aliases', () => {
  const found = findCategoryForTech(CATEGORIES, 'react')

  assert.equal(found.category.id, 'frontend')
  assert.equal(found.tech.name, 'React JS')
})

test('reports nothing for a tech no category claims', () => {
  assert.equal(findCategoryForTech(CATEGORIES, 'cobol'), null)
  assert.equal(findCategoryForTech(CATEGORIES, ''), null)
  assert.equal(findCategoryForTech(CATEGORIES, undefined), null)
})

test('lists the techs of a category, and nothing for an unknown one', () => {
  assert.deepEqual(techsOfCategory(CATEGORIES, 'web-layout'), [{ name: 'Css' }, { name: 'Html' }])
  assert.deepEqual(techsOfCategory(CATEGORIES, 'unknown'), [])
  assert.deepEqual(techsOfCategory(CATEGORIES, ''), [])
})
