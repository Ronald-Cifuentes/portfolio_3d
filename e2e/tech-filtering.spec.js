import { expect, test } from './fixtures.js'

const goToSkills = async page => {
  await page.goto('/')
  await page.locator('nav a[href="#skills"]').first().click()
  await expect(page.locator('#skills')).toBeInViewport()
}

test('opening a category reveals the techs it owns', async ({ page }) => {
  await goToSkills(page)

  const techGrid = page.getByTestId('tech-grid')
  await expect(techGrid).toHaveAttribute('data-visible', 'false')

  await page.getByRole('button', { name: 'Show Web Layout skills' }).click()

  await expect(techGrid).toHaveAttribute('data-visible', 'true')
  await expect(techGrid.getByText('Html', { exact: true })).toBeVisible()
})

test('selecting a tech lists the projects that use it', async ({ page }) => {
  await goToSkills(page)

  await page.getByRole('button', { name: 'Show Frontend Developer skills' }).click()
  await page.getByRole('button', { name: 'Click to filter projects by React JS' }).click()

  const showcase = page.locator('.project-showcase')
  await expect(showcase).toBeVisible()
  await expect(showcase.locator('.project-showcase__card')).not.toHaveCount(0)
})

test('a tag inside the showcase switches the filter to that tech', async ({ page }) => {
  await goToSkills(page)

  await page.getByRole('button', { name: 'Show Frontend Developer skills' }).click()
  await page.getByRole('button', { name: 'Click to filter projects by React JS' }).click()

  const showcase = page.locator('.project-showcase')
  await showcase.getByRole('button', { name: 'Filter by #jest' }).first().click()

  await expect(page.getByTestId('tech-grid').getByText('Jest', { exact: true })).toBeVisible()
  await expect(showcase.locator('.project-showcase__card')).not.toHaveCount(0)
})

test('a tag no category owns is still shown as the active filter', async ({ page }) => {
  await goToSkills(page)

  await page.getByRole('button', { name: 'Show Frontend Developer skills' }).click()
  await page.getByRole('button', { name: 'Click to filter projects by React JS' }).click()

  const showcase = page.locator('.project-showcase')
  await showcase.getByRole('button', { name: 'Filter by #axios' }).first().click()

  await expect(page.locator('.card-container--orphan')).toBeVisible()
  await expect(page.locator('.orphan-label')).toHaveText('axios')
})

test('clearing the filter puts the categories back', async ({ page }) => {
  await goToSkills(page)

  await page.getByRole('button', { name: 'Show Frontend Developer skills' }).click()
  const reactTech = page.getByRole('button', { name: 'Click to filter projects by React JS' })
  await reactTech.click()

  await expect(page.locator('.project-showcase')).toBeVisible()

  await page.getByRole('button', { name: 'Click to clear this filter' }).first().click()

  await expect(page.locator('.project-showcase')).toHaveCount(0)
})

test('a project tag jumps to the skills section already filtered', async ({ page }) => {
  await page.goto('/')

  const activeSlide = page.locator('.swiper-slide-active .project-slide')
  await expect(activeSlide).toBeVisible()

  const firstTag = activeSlide.locator('.project-slide__tags button').first()
  const tagLabel = await firstTag.getAttribute('aria-label')
  await firstTag.click()

  await expect(page.locator('#skills')).toBeInViewport()
  await expect(page.locator('.project-showcase')).toBeVisible()
  expect(tagLabel).toMatch(/^Filter by #/)
})
