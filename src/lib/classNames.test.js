import assert from 'node:assert/strict'
import test from 'node:test'

import { cx } from './classNames.js'

test('joins the class names that apply', () => {
  assert.equal(cx('card', 'is-active'), 'card is-active')
})

test('drops the conditions that did not apply', () => {
  const isActive = false

  assert.equal(cx('card', isActive && 'is-active', undefined, null, ''), 'card')
})

test('nothing applying yields an empty class attribute', () => {
  const isActive = false

  assert.equal(cx(), '')
  assert.equal(cx(isActive, null), '')
})
