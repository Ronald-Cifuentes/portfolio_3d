import assert from 'node:assert/strict'
import test from 'node:test'

import {
  MIN_SEGMENT_SECONDS,
  YOUTUBE_ORIGIN,
  buildEmbedUrl,
  indexAvoidingRepeat,
  normalizePlaylist,
  playlistStorageKey,
  segmentSeconds,
} from './youtubeEmbed.js'

test('drops playlist entries without a usable video id', () => {
  const playlist = normalizePlaylist([
    { videoId: 'abc', start: 0, end: 60 },
    { videoId: '   ' },
    { start: 3 },
    null,
  ])

  assert.deepEqual(playlist, [{ videoId: 'abc', start: 0, end: 60 }])
})

test('trims ids and forgets bounds that are not finite numbers', () => {
  assert.deepEqual(normalizePlaylist([{ videoId: ' abc ', start: 'x', end: NaN }]), [
    { videoId: 'abc', start: undefined, end: undefined },
  ])
})

test('an absent playlist normalises to an empty one', () => {
  assert.deepEqual(normalizePlaylist(undefined), [])
  assert.deepEqual(normalizePlaylist('not a playlist'), [])
})

test('the storage key identifies the exact playlist, and is absent when empty', () => {
  assert.equal(playlistStorageKey([{ videoId: 'a' }, { videoId: 'b' }]), 'ytbg:lastIndex:a|b')
  assert.equal(playlistStorageKey([]), null)
})

test('a segment lasts from start to end, with a documented minimum', () => {
  assert.equal(segmentSeconds({ start: 10, end: 70 }), 60)
  assert.equal(segmentSeconds({ start: 10, end: 12 }), MIN_SEGMENT_SECONDS)
  assert.equal(segmentSeconds({ start: -5, end: 60 }), 60)
})

test('a segment without an end falls back to the default length', () => {
  assert.equal(segmentSeconds({ start: 0 }), 60)
  assert.equal(segmentSeconds({}), 60)
})

test('a fresh random index steps forward when it repeats the previous one', () => {
  assert.equal(indexAvoidingRepeat(5, 2, 2), 3)
  assert.equal(indexAvoidingRepeat(5, 4, 4), 0)
  assert.equal(indexAvoidingRepeat(5, 2, 1), 2)
  assert.equal(indexAvoidingRepeat(5, 2, NaN), 2)
  assert.equal(indexAvoidingRepeat(1, 0, 0), 0)
})

test('builds a privacy-preserving embed url with the requested segment and quality', () => {
  const url = new URL(
    buildEmbedUrl({
      videoId: 'abc123',
      start: 18.7,
      end: 78.2,
      youtubeQuality: 'hd1080',
      pageOrigin: 'https://example.com',
    })
  )

  assert.equal(url.origin, YOUTUBE_ORIGIN)
  assert.equal(url.pathname, '/embed/abc123')
  assert.equal(url.searchParams.get('start'), '18')
  assert.equal(url.searchParams.get('end'), '78')
  assert.equal(url.searchParams.get('vq'), 'hd1080')
  assert.equal(url.searchParams.get('origin'), 'https://example.com')
  assert.equal(url.searchParams.get('playlist'), 'abc123')
  assert.equal(url.searchParams.get('mute'), '1')
  assert.equal(url.searchParams.get('controls'), '0')
})

test('omits bounds and origin that were not supplied', () => {
  const url = new URL(buildEmbedUrl({ videoId: 'abc', youtubeQuality: 'hd720' }))

  assert.equal(url.searchParams.has('start'), false)
  assert.equal(url.searchParams.has('end'), false)
  assert.equal(url.searchParams.has('origin'), false)
})

test('there is no url to load without a video', () => {
  assert.equal(buildEmbedUrl({ videoId: undefined, youtubeQuality: 'hd720' }), '')
})
