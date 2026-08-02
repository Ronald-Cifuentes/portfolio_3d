import assert from 'node:assert/strict'
import test from 'node:test'

import {
  TIERS,
  coverScaleForPlayer,
  playerDimensionsForTier,
  throughputMbpsFromResourceTimings,
  tierForMbps,
} from './videoQuality.js'

test('selects 4K only when throughput is strictly above 120 Mbps', () => {
  assert.equal(tierForMbps(120.01), TIERS.UHD_4K)
  assert.equal(tierForMbps(121), TIERS.UHD_4K)
  assert.equal(tierForMbps(Infinity), TIERS.UHD_4K)
})

test('selects Full HD from 60 Mbps through 120 Mbps', () => {
  assert.equal(tierForMbps(60), TIERS.FULL_HD)
  assert.equal(tierForMbps(119.99), TIERS.FULL_HD)
  assert.equal(tierForMbps(120), TIERS.FULL_HD)
})

test('selects Simple HD below 60 Mbps and for an unknown signal', () => {
  assert.equal(tierForMbps(59.99), TIERS.SIMPLE_HD)
  assert.equal(tierForMbps(0), TIERS.SIMPLE_HD)
  assert.equal(tierForMbps(-1), TIERS.SIMPLE_HD)
  assert.equal(tierForMbps(NaN), TIERS.SIMPLE_HD)
  assert.equal(tierForMbps(null), TIERS.SIMPLE_HD)
})

test('maps every tier to its exact 16:9 player viewport', () => {
  assert.deepEqual(playerDimensionsForTier(TIERS.SIMPLE_HD), {
    label: 'Simple HD',
    width: 1280,
    height: 720,
    youtubeQuality: 'hd720',
  })
  assert.deepEqual(playerDimensionsForTier(TIERS.FULL_HD), {
    label: 'Full HD',
    width: 1920,
    height: 1080,
    youtubeQuality: 'hd1080',
  })
  assert.deepEqual(playerDimensionsForTier(TIERS.UHD_4K), {
    label: '4K',
    width: 3840,
    height: 2160,
    youtubeQuality: 'hd2160',
  })
})

test('falls back to the smallest player for an unknown tier', () => {
  assert.equal(playerDimensionsForTier(undefined).youtubeQuality, 'hd720')
  assert.equal(playerDimensionsForTier('8k').youtubeQuality, 'hd720')
})

test('cover scale fills landscape and portrait containers but never shrinks the player', () => {
  const fullHd = playerDimensionsForTier(TIERS.FULL_HD)
  const ultraHd = playerDimensionsForTier(TIERS.UHD_4K)

  assert.equal(coverScaleForPlayer(1920, 1080, fullHd, 1), 1)
  assert.equal(coverScaleForPlayer(1080, 1920, fullHd, 1), 1920 / 1080)
  assert.equal(coverScaleForPlayer(1920, 1080, ultraHd, 1), 1)
})

test('cover scale stays at 1 for a container that has not been laid out yet', () => {
  const fullHd = playerDimensionsForTier(TIERS.FULL_HD)

  assert.equal(coverScaleForPlayer(0, 1080, fullHd), 1)
  assert.equal(coverScaleForPlayer(1920, 0, fullHd), 1)
})

test('measures aggregate throughput over the union of overlapping downloads', () => {
  const entries = [
    { transferSize: 500_000, encodedBodySize: 500_000, responseStart: 0, responseEnd: 50 },
    { transferSize: 250_000, encodedBodySize: 250_000, responseStart: 25, responseEnd: 75 },
  ]

  assert.equal(throughputMbpsFromResourceTimings(entries), 80)
})

test('ignores downloads that started before the requested measurement window', () => {
  const entries = [
    { transferSize: 500_000, encodedBodySize: 500_000, responseStart: 0, responseEnd: 50 },
    { transferSize: 250_000, encodedBodySize: 250_000, responseStart: 25, responseEnd: 75 },
  ]

  assert.equal(throughputMbpsFromResourceTimings(entries, 10), 40)
})

test('reports no measurement when the evidence is too thin to trust', () => {
  assert.equal(throughputMbpsFromResourceTimings([]), null)
  assert.equal(
    throughputMbpsFromResourceTimings([
      { transferSize: 20_000, encodedBodySize: 20_000, responseStart: 0, responseEnd: 10 },
    ]),
    null
  )
})

test('ignores resources served from cache, which report no transfer', () => {
  assert.equal(
    throughputMbpsFromResourceTimings([
      { transferSize: 0, encodedBodySize: 500_000, responseStart: 0, responseEnd: 50 },
    ]),
    null
  )
})
