import { expect, test } from './fixtures.js'

const SECTION_IDS = ['home', 'work', 'projects', 'skills', 'contact']

test('renders every navigable section', async ({ page }) => {
  await page.goto('/')

  for (const sectionId of SECTION_IDS) {
    await expect(page.locator(`#${sectionId}`)).toHaveCount(1)
  }
})

test('the hero introduces the portfolio owner', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Ronald')
})

test('a nav link scrolls to its section and marks itself current', async ({ page }) => {
  await page.goto('/')

  const projectsLink = page.locator('nav a[href="#projects"]').first()
  await projectsLink.click()

  await expect(page).toHaveURL(/#projects$/)
  await expect(page.locator('#projects')).toBeInViewport()
  await expect(projectsLink).toHaveAttribute('aria-current', 'page')
})

test('deep linking to a section lands on it', async ({ page }) => {
  await page.goto('/#work')

  await expect(page.locator('#work')).toBeInViewport()
})

test('every social link opens safely in a new tab and is announced', async ({ page }) => {
  await page.goto('/')

  const socialLinks = page.locator('.social a')
  await expect(socialLinks).not.toHaveCount(0)

  for (const link of await socialLinks.all()) {
    await expect(link).toHaveAttribute('target', '_blank')
    await expect(link).toHaveAttribute('rel', /noopener/)
    await expect(link).toHaveAttribute('aria-label', /\w+/)
  }
})

test('the background offers keyboard-reachable video controls', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('button', { name: 'Previous video' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Next video' })).toBeVisible()
})
