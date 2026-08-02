import assert from 'node:assert/strict'
import test from 'node:test'

import { AVAILABLE_LOCALES, DEFAULT_LOCALE, t } from './i18n.js'

test('exposes the locales it can actually serve', () => {
  assert.ok(AVAILABLE_LOCALES.includes(DEFAULT_LOCALE))
})

test('resolves a nested key to its translation', () => {
  assert.equal(t('nav.home'), 'Home')
  assert.equal(t('contact.send'), 'Send')
})

test('interpolates named placeholders and leaves unknown ones intact', () => {
  assert.equal(t('projects.filterByTag', { tag: 'react' }), 'Filter by #react')
  assert.equal(t('projects.filterByTag'), 'Filter by #{{tag}}')
})

test('falls back to the default locale for an unknown locale', () => {
  assert.equal(t('nav.home', {}, 'klingon'), 'Home')
})

test('returns the key itself when there is no translation for it', () => {
  assert.equal(t('nav.thereIsNoSuchSection'), 'nav.thereIsNoSuchSection')
  assert.equal(t('completely.unknown.path'), 'completely.unknown.path')
})

test('returns non-string translations untouched', () => {
  assert.deepEqual(typeof t('nav'), 'object')
})
