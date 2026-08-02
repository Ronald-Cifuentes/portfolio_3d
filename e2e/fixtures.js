import { test as base, expect } from '@playwright/test'

const THIRD_PARTY_PATTERNS = ['**://*.youtube.com/**', '**://*.youtube-nocookie.com/**']

const IGNORED_CONSOLE_MESSAGES = [/Failed to load resource/i, /net::ERR_/i, /WebGL/i]

export const test = base.extend({
  page: async ({ page }, use) => {
    await Promise.all(
      THIRD_PARTY_PATTERNS.map(pattern => page.route(pattern, route => route.abort()))
    )

    const consoleErrors = []
    page.on('console', message => {
      if (message.type() !== 'error') return
      if (IGNORED_CONSOLE_MESSAGES.some(pattern => pattern.test(message.text()))) return

      consoleErrors.push(message.text())
    })
    page.on('pageerror', error => consoleErrors.push(error.message))

    await use(page)

    expect(consoleErrors, 'the page logged unexpected errors').toEqual([])
  },
})

export { expect }
