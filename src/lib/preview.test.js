import assert from 'node:assert/strict'
import test from 'node:test'

import { splitPreview } from './preview.js'

test('shows the first items and counts the rest', () => {
  assert.deepEqual(splitPreview(['a', 'b', 'c', 'd'], 2), { visible: ['a', 'b'], hiddenCount: 2 })
})

test('hides nothing when everything fits in the preview', () => {
  assert.deepEqual(splitPreview(['a', 'b'], 4), { visible: ['a', 'b'], hiddenCount: 0 })
  assert.deepEqual(splitPreview(['a', 'b'], 2), { visible: ['a', 'b'], hiddenCount: 0 })
})

test('treats a missing collection as empty', () => {
  assert.deepEqual(splitPreview(undefined, 3), { visible: [], hiddenCount: 0 })
  assert.deepEqual(splitPreview(null, 3), { visible: [], hiddenCount: 0 })
})
