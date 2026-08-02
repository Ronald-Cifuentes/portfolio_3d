import assert from 'node:assert/strict'
import test from 'node:test'

import {
  BACKGROUND_PLAYLIST,
  EXPERIENCES,
  NAV_SECTION_IDS,
  PROJECTS,
  TECH_CATEGORIES,
} from './index.js'
import { normalizePlaylist, segmentSeconds } from '../lib/youtubeEmbed.js'
import { findCategoryForTech } from '../lib/techCategories.js'
import { t } from '../lib/i18n.js'

test('every navigable section has a translated label', () => {
  assert.ok(NAV_SECTION_IDS.length > 0)

  NAV_SECTION_IDS.forEach(sectionId => {
    assert.notEqual(t(`nav.${sectionId}`), `nav.${sectionId}`, `missing label for ${sectionId}`)
  })
})

test('every tech category is identifiable, labelled and populated', () => {
  const ids = new Set()

  TECH_CATEGORIES.forEach(category => {
    assert.ok(category.id, 'a category has no id')
    assert.equal(ids.has(category.id), false, `duplicate category id ${category.id}`)
    ids.add(category.id)

    assert.ok(category.title, `category ${category.id} has no title`)
    assert.ok(category.icon, `category ${category.id} has no icon`)
    assert.ok(category.techs.length > 0, `category ${category.id} has no techs`)
  })
})

test('every tech is named, illustrated and listed once within its category', () => {
  TECH_CATEGORIES.forEach(category => {
    const names = category.techs.map(tech => tech.name)

    assert.equal(new Set(names).size, names.length, `category ${category.id} repeats a tech`)
    category.techs.forEach(tech => {
      assert.ok(tech.name, `a tech in ${category.id} has no name`)
      assert.ok(tech.icon, `tech ${tech.name} has no icon`)
    })
  })
})

test('a tech shared by several categories resolves to the first that lists it', () => {
  const firstCategoryByTechName = new Map()

  TECH_CATEGORIES.forEach(category => {
    category.techs.forEach(tech => {
      if (!firstCategoryByTechName.has(tech.name)) {
        firstCategoryByTechName.set(tech.name, category.id)
      }
    })
  })

  firstCategoryByTechName.forEach((categoryId, techName) => {
    const found = findCategoryForTech(TECH_CATEGORIES, techName)

    assert.equal(found?.category.id, categoryId, `${techName} resolves to the wrong category`)
  })
})

test('every project links to its source and carries at least one tag', () => {
  assert.ok(PROJECTS.length > 0)

  const names = new Set()

  PROJECTS.forEach(project => {
    assert.ok(project.name, 'a project has no name')
    assert.equal(names.has(project.name), false, `duplicate project name ${project.name}`)
    names.add(project.name)

    assert.ok(project.image, `project ${project.name} has no image`)
    assert.match(project.sourceCodeUrl, /^https:\/\//, `project ${project.name} has no https link`)
    assert.ok(project.tags.length > 0, `project ${project.name} has no tags`)
  })
})

test('every project tag is named once and styled', () => {
  PROJECTS.forEach(project => {
    const tagNames = project.tags.map(tag => tag.name)

    assert.equal(new Set(tagNames).size, tagNames.length, `${project.name} repeats a tag`)
    project.tags.forEach(tag => {
      assert.ok(tag.color, `tag ${tag.name} of ${project.name} has no colour`)
    })
  })
})

test('every experience is dated, attributed and illustrated', () => {
  assert.ok(EXPERIENCES.length > 0)

  EXPERIENCES.forEach(experience => {
    assert.ok(experience.title, 'an experience has no title')
    assert.ok(experience.companyName, `experience ${experience.title} has no company`)
    assert.ok(experience.date, `experience ${experience.title} has no date`)
    assert.ok(experience.icon, `experience ${experience.title} has no icon`)
    assert.ok(experience.iconBg, `experience ${experience.title} has no icon background`)
    assert.ok(experience.points.length > 0, `experience ${experience.title} has no highlights`)
  })
})

test('experiences, highlights and technologies stay unique enough to key a list on', () => {
  const experienceKeys = EXPERIENCES.map(
    experience => `${experience.companyName}-${experience.title}`
  )

  assert.equal(new Set(experienceKeys).size, experienceKeys.length)

  EXPERIENCES.forEach(experience => {
    const points = experience.points ?? []
    const technologies = experience.technologies ?? []

    assert.equal(new Set(points).size, points.length, `${experience.title} repeats a highlight`)
    assert.equal(
      new Set(technologies).size,
      technologies.length,
      `${experience.title} repeats a technology`
    )
  })
})

test('every background video survives normalisation and plays a real segment', () => {
  const playlist = normalizePlaylist(BACKGROUND_PLAYLIST)

  assert.equal(playlist.length, BACKGROUND_PLAYLIST.length)
  playlist.forEach(entry => {
    assert.ok(entry.end > entry.start, `segment of ${entry.videoId} ends before it starts`)
    assert.ok(segmentSeconds(entry) > 0)
  })
})

test('the playlist has no repeated video, so rotation never stalls on one clip', () => {
  const ids = BACKGROUND_PLAYLIST.map(entry => entry.videoId)

  assert.equal(new Set(ids).size, ids.length)
})
