const HIDDEN_CONSOLE_PATTERNS = [
  'Swiper Loop Warning: The number of slides is not enough for loop mode',
  "[Violation] 'setTimeout' handler took",
  '[Violation] Added non-passive event listener to a scroll-blocking',
]

const CONSOLE_METHODS = ['warn', 'info', 'log', 'debug']
const INSTALL_KEY = '__portfolioConsoleNoiseFilterInstalled'

const shouldHideConsoleNoise = value =>
  typeof value === 'string' &&
  HIDDEN_CONSOLE_PATTERNS.some(pattern => value.includes(pattern))

const wrapConsoleMethod = methodName => {
  const originalMethod = console[methodName]

  if (typeof originalMethod !== 'function') return

  console[methodName] = function filteredConsoleMethod(...args) {
    if (args.some(shouldHideConsoleNoise)) return

    return originalMethod.apply(this, args)
  }
}

if (typeof console !== 'undefined' && !console[INSTALL_KEY]) {
  Object.defineProperty(console, INSTALL_KEY, { value: true })
  CONSOLE_METHODS.forEach(wrapConsoleMethod)
}
