import { expect, test } from './fixtures.js'

const openFirstExperience = async page => {
  await page.goto('/#work')

  const card = page.locator('[aria-haspopup="dialog"]').first()
  await expect(card).toBeVisible()
  await card.click()

  return page.getByRole('dialog')
}

test('a timeline card opens the full experience in a dialog', async ({ page }) => {
  const dialog = await openFirstExperience(page)

  await expect(dialog).toBeVisible()
  await expect(dialog).toHaveAttribute('aria-modal', 'true')
  await expect(dialog.getByRole('heading', { level: 3 })).toBeVisible()
})

test('the dialog takes focus and hands it back when it closes', async ({ page }) => {
  const dialog = await openFirstExperience(page)

  const closeButton = dialog.getByRole('button', { name: 'Close experience details' })
  await expect(closeButton).toBeFocused()

  await closeButton.click()

  await expect(dialog).toHaveCount(0)
  await expect(page.locator('[aria-haspopup="dialog"]').first()).toBeFocused()
})

test('Escape closes the dialog', async ({ page }) => {
  const dialog = await openFirstExperience(page)

  await page.keyboard.press('Escape')

  await expect(dialog).toHaveCount(0)
})

test('the page behind the dialog cannot scroll away', async ({ page }) => {
  await openFirstExperience(page)

  await expect(page.locator('body')).toHaveCSS('overflow', 'hidden')
})

test('a timeline card opens from the keyboard alone', async ({ page }) => {
  await page.goto('/#work')

  const card = page.locator('[aria-haspopup="dialog"]').first()
  await card.focus()
  await page.keyboard.press('Enter')

  await expect(page.getByRole('dialog')).toBeVisible()
})
