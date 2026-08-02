import assert from 'node:assert/strict'
import test from 'node:test'

import {
  normalizeTechName,
  projectMatchesSelectedTech,
  techNamesMatchExactly,
  techNamesMatchLoosely,
} from './techMatching.js'

test('normalises a display name to comparable letters and digits', () => {
  assert.equal(normalizeTechName('  React JS '), 'reactjs')
  assert.equal(normalizeTechName('C++'), 'c')
  assert.equal(normalizeTechName('.Net Core'), 'netcore')
  assert.equal(normalizeTechName(null), '')
  assert.equal(normalizeTechName(undefined), '')
})

test('matches a tech with its documented aliases in both directions', () => {
  assert.ok(techNamesMatchExactly('JavaScript', 'js'))
  assert.ok(techNamesMatchExactly('js', 'JavaScript'))
  assert.ok(techNamesMatchExactly('TypeScript', 'ts'))
  assert.ok(techNamesMatchExactly('React JS', 'react'))
  assert.ok(techNamesMatchExactly('Three JS', 'three'))
  assert.ok(techNamesMatchExactly('Node JS', 'nodejs'))
  assert.ok(techNamesMatchExactly('Redux Toolkit', 'redux'))
})

test('an exact match never fires on an empty or unrelated name', () => {
  assert.equal(techNamesMatchExactly('', 'react'), false)
  assert.equal(techNamesMatchExactly('react', ''), false)
  assert.equal(techNamesMatchExactly('react', 'vue'), false)
  assert.equal(techNamesMatchExactly('jest', 'testing-library'), false)
})

test('a loose match also accepts a containment of at least three letters', () => {
  assert.ok(techNamesMatchLoosely('tailwindcss', 'tailwind'))
  assert.ok(techNamesMatchLoosely('create-react-app', 'react'))
  assert.equal(techNamesMatchLoosely('go', 'golang'), false)
  assert.equal(techNamesMatchLoosely('react', 'vue'), false)
})

test('a project matches when any of its tags matches the selected tech', () => {
  const project = { tags: [{ name: 'nextjs' }, { name: 'axios' }] }

  assert.ok(projectMatchesSelectedTech(project, 'next'))
  assert.ok(projectMatchesSelectedTech(project, 'axios'))
  assert.equal(projectMatchesSelectedTech(project, 'svelte'), false)
})

test('no selected tech means every project matches, even an untagged one', () => {
  assert.ok(projectMatchesSelectedTech({ tags: [{ name: 'react' }] }, ''))
  assert.ok(projectMatchesSelectedTech({}, ''))
})
