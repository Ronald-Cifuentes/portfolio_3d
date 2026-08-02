#!/usr/bin/env node
import { readdir, readFile, writeFile, stat } from 'node:fs/promises'
import { join, extname, basename, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const ASSETS = join(ROOT, 'src', 'assets')
const SRC = join(ROOT, 'src')

const CAROUSEL_SCREENSHOT_NAMES = new Set(['SpotiClone', 'tourguides', 'calculator', 'airlines'])
const FAVICON_NAMES_KEPT_AS_PNG = new Set(['icon'])

const ICON_EDGE = 256
const SCREENSHOT_WIDTH = 1000
const RASTERISE_SVG_ABOVE_BYTES = 20 * 1024
const SVG_RASTER_DENSITY_DPI = 384
const TOP_SAVINGS_ROWS_LOGGED = 12

const encodeSmaller = async pipeline => {
  const [lossy, lossless] = await Promise.all([
    pipeline.clone().webp({ quality: 82, effort: 6, smartSubsample: true }).toBuffer(),
    pipeline.clone().webp({ lossless: true, effort: 6 }).toBuffer(),
  ])
  return lossless.length < lossy.length
    ? { buffer: lossless, mode: 'lossless' }
    : { buffer: lossy, mode: 'lossy' }
}

const resizeOptionsFor = name =>
  CAROUSEL_SCREENSHOT_NAMES.has(name)
    ? { width: SCREENSHOT_WIDTH, withoutEnlargement: true }
    : { width: ICON_EDGE, height: ICON_EDGE, fit: 'inside', withoutEnlargement: true }

const convert = async () => {
  const files = (await readdir(ASSETS)).filter(f => ['.png', '.svg'].includes(extname(f)))
  const results = []

  for (const file of files) {
    const ext = extname(file)
    const name = basename(file, ext)
    if (FAVICON_NAMES_KEPT_AS_PNG.has(name)) continue

    const source = join(ASSETS, file)
    const isSvg = ext === '.svg'
    const originalSize = (await stat(source)).size
    if (isSvg && originalSize < RASTERISE_SVG_ABOVE_BYTES) continue

    const input = await readFile(source)
    const resize = resizeOptionsFor(name)

    const pipeline = isSvg
      ? sharp(input, { density: SVG_RASTER_DENSITY_DPI }).resize(resize)
      : sharp(input).resize(resize)

    const { buffer, mode } = await encodeSmaller(pipeline)

    const webpIsNotSmaller = buffer.length >= originalSize
    if (webpIsNotSmaller) {
      results.push({ file, kept: true, originalSize, newSize: originalSize })
      continue
    }

    await writeFile(join(ASSETS, `${name}.webp`), buffer)
    results.push({
      file,
      from: `${name}${ext}`,
      to: `${name}.webp`,
      mode,
      originalSize,
      newSize: buffer.length,
    })
  }

  return results
}

const escapeForRegExp = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const repointImports = async converted => {
  const rewrites = converted.filter(r => !r.kept)
  if (!rewrites.length) return []

  const walk = async dir => {
    const out = []
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name)
      if (entry.isDirectory()) out.push(...(await walk(full)))
      else if (/\.(jsx?|css)$/.test(entry.name)) out.push(full)
    }
    return out
  }

  const touched = []
  for (const file of await walk(SRC)) {
    const before = await readFile(file, 'utf8')
    let after = before

    for (const { from, to } of rewrites) {
      const beforeClosingQuote = `${escapeForRegExp(from)}(?=['"\`])`
      after = after.replace(new RegExp(beforeClosingQuote, 'g'), to)
    }

    if (after !== before) {
      await writeFile(file, after)
      touched.push(file.replace(`${ROOT}/`, ''))
    }
  }
  return touched
}

const run = async () => {
  const results = await convert()
  const converted = results.filter(r => !r.kept)
  const kb = n => `${(n / 1024).toFixed(1)} kB`

  converted
    .sort((a, b) => b.originalSize - b.newSize - (a.originalSize - a.newSize))
    .slice(0, TOP_SAVINGS_ROWS_LOGGED)
    .forEach(r =>
      console.log(
        `${r.from.padEnd(24)} ${kb(r.originalSize).padStart(10)} -> ${kb(r.newSize).padStart(9)}` +
          `  (-${(100 - (r.newSize / r.originalSize) * 100).toFixed(1)}%, ${r.mode})`
      )
    )

  const before = results.reduce((a, r) => a + r.originalSize, 0)
  const after = results.reduce((a, r) => a + r.newSize, 0)
  console.log(
    `\n... ${Math.max(0, converted.length - TOP_SAVINGS_ROWS_LOGGED)} more` +
      `\n${converted.length} converted, ${results.length - converted.length} kept as-is` +
      `\ntotal ${(before / 1024 / 1024).toFixed(2)} MB -> ${(after / 1024 / 1024).toFixed(2)} MB`
  )

  const touched = await repointImports(results)
  console.log(`\nrepointed imports in ${touched.length} file(s):\n  ${touched.join('\n  ')}`)
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
