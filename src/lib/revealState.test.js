import assert from 'node:assert/strict'
import test from 'node:test'

import { REVEAL_STATE, isRevealed, revealStateOf } from './revealState.js'

test('scroll-driven animation wins over the observer fallback', () => {
  assert.equal(revealStateOf({ scrollDriven: true, revealed: false }), REVEAL_STATE.SCROLL_DRIVEN)
  assert.equal(revealStateOf({ scrollDriven: true, revealed: true }), REVEAL_STATE.SCROLL_DRIVEN)
})

test('falls back to the observed reveal when scroll timelines are unavailable', () => {
  assert.equal(revealStateOf({ scrollDriven: false, revealed: true }), REVEAL_STATE.REVEALED)
  assert.equal(revealStateOf({ scrollDriven: false, revealed: false }), REVEAL_STATE.PENDING)
})

test('content counts as revealed unless it is still pending', () => {
  assert.ok(isRevealed(REVEAL_STATE.SCROLL_DRIVEN))
  assert.ok(isRevealed(REVEAL_STATE.REVEALED))
  assert.equal(isRevealed(REVEAL_STATE.PENDING), false)
})
