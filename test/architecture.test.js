import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

import { TRANSLATIONS } from '../src/constants/translations.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE_ROOT = join(ROOT, 'src')

const SOURCE_EXTENSIONS = ['.js', '.jsx']
const ALLOWED_DIRECTIVE_COMMENT = /^\s*(\/\/\/\s*<reference|\/\*\s*(eslint|prettier|global|@ts-))/

const filesUnder = directory =>
  readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const entryPath = join(directory, entry.name)
    if (entry.isDirectory()) return filesUnder(entryPath)

    return SOURCE_EXTENSIONS.some(extension => entry.name.endsWith(extension)) ? [entryPath] : []
  })

const SOURCE_FILES = filesUnder(SOURCE_ROOT)
const PRODUCTION_FILES = SOURCE_FILES.filter(file => !file.endsWith('.test.js'))

const read = file => readFileSync(file, 'utf8')
const relativeToRoot = file => relative(ROOT, file)

const importSpecifiersIn = source =>
  [
    ...source.matchAll(/(?:^|\n)\s*(?:import|export)[^\n]*?from\s+'([^']+)'/g),
    ...source.matchAll(/import\('([^']+)'\)/g),
    ...source.matchAll(/(?:^|\n)\s*import\s+'([^']+)'/g),
  ].map(match => match[1])

const isInLayer = (file, layer) => relativeToRoot(file).startsWith(`src/${layer}/`)

const commentLinesIn = source =>
  source
    .split('\n')
    .map((line, index) => ({ line, lineNumber: index + 1 }))
    .filter(({ line }) => /^\s*(\/\/|\/\*|\*\s)/.test(line))
    .filter(({ line }) => !ALLOWED_DIRECTIVE_COMMENT.test(line))

test('no source file carries a code comment', () => {
  const offenders = SOURCE_FILES.flatMap(file =>
    commentLinesIn(read(file)).map(
      ({ lineNumber, line }) => `${relativeToRoot(file)}:${lineNumber} ${line.trim()}`
    )
  )

  assert.deepEqual(offenders, [])
})

test('no source file leaves console output behind', () => {
  const offenders = PRODUCTION_FILES.filter(file =>
    /\bconsole\.(log|debug|info)\(/.test(read(file))
  )

  assert.deepEqual(offenders.map(relativeToRoot), [])
})

test('the pure core never depends on React, the DOM adapters or the UI', () => {
  const offenders = PRODUCTION_FILES.filter(file => isInLayer(file, 'lib')).flatMap(file =>
    importSpecifiersIn(read(file))
      .filter(
        specifier =>
          specifier === 'react' ||
          specifier.startsWith('../components') ||
          specifier.startsWith('../platform') ||
          specifier.startsWith('../hooks')
      )
      .map(specifier => `${relativeToRoot(file)} -> ${specifier}`)
  )

  assert.deepEqual(offenders, [])
})

test('hooks and browser adapters never depend on the UI', () => {
  const offenders = PRODUCTION_FILES.filter(
    file => isInLayer(file, 'hooks') || isInLayer(file, 'platform')
  ).flatMap(file =>
    importSpecifiersIn(read(file))
      .filter(specifier => specifier.startsWith('../components/'))
      .filter(specifier => !specifier.includes('/canvas/'))
      .map(specifier => `${relativeToRoot(file)} -> ${specifier}`)
  )

  assert.deepEqual(offenders, [])
})

const A_SIBLING_FEATURE = /^\.\.\/([A-Z]\w*)\/(.+)$/

test('a component reaches a sibling feature only through its public entry point', () => {
  const offenders = PRODUCTION_FILES.filter(file => isInLayer(file, 'components')).flatMap(file =>
    importSpecifiersIn(read(file))
      .filter(specifier => A_SIBLING_FEATURE.test(specifier))
      .map(specifier => `${relativeToRoot(file)} -> ${specifier}`)
  )

  assert.deepEqual(offenders, [])
})

const leafKeyPaths = (branch, prefix = []) =>
  Object.entries(branch).flatMap(([key, value]) =>
    typeof value === 'object' && value !== null
      ? leafKeyPaths(value, [...prefix, key])
      : [[...prefix, key].join('.')]
  )

test('every translation is actually rendered somewhere', () => {
  const sources = PRODUCTION_FILES.map(read).join('\n')
  const isUsed = keyPath => {
    if (sources.includes(`'${keyPath}'`)) return true

    const namespace = keyPath.slice(0, keyPath.lastIndexOf('.'))

    return sources.includes(`\`${namespace}.\${`)
  }

  const unused = leafKeyPaths(TRANSLATIONS.en).filter(keyPath => !isUsed(keyPath))

  assert.deepEqual(unused, [])
})

test('every exported asset is referenced by the application', () => {
  const assetIndex = read(join(SOURCE_ROOT, 'assets', 'index.js'))
  const exportedNames = [...assetIndex.matchAll(/export \{ default as (\w+) \}/g)].map(
    match => match[1]
  )
  const consumers = PRODUCTION_FILES.filter(file => !file.endsWith(join('assets', 'index.js')))
    .map(read)
    .join('\n')

  const unused = exportedNames.filter(
    name => !new RegExp(`(^|[^\\w])${name}([^\\w]|$)`, 'm').test(consumers)
  )

  assert.deepEqual(unused, [])
})
