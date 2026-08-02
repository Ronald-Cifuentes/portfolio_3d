import assert from 'node:assert/strict'
import test from 'node:test'

import { onActivationKey } from './keyboardActivation.js'

const keyEvent = key => {
  const event = { key, defaultPrevented: false }
  event.preventDefault = () => {
    event.defaultPrevented = true
  }

  return event
}

test('activates on Enter and Space, the keys a button responds to', () => {
  const activated = []
  const handle = onActivationKey(() => activated.push('activated'))

  handle(keyEvent('Enter'))
  handle(keyEvent(' '))

  assert.deepEqual(activated, ['activated', 'activated'])
})

test('stops Space from scrolling the page when it activates a card', () => {
  const event = keyEvent(' ')
  onActivationKey(() => {})(event)

  assert.equal(event.defaultPrevented, true)
})

test('leaves every other key to the browser', () => {
  const activated = []
  const handle = onActivationKey(() => activated.push('activated'))
  const event = keyEvent('Tab')

  handle(event)
  handle(keyEvent('a'))
  handle(keyEvent('Escape'))

  assert.deepEqual(activated, [])
  assert.equal(event.defaultPrevented, false)
})
