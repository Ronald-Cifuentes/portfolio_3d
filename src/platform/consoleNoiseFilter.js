const HIDDEN_CONSOLE_PATTERNS = Object.freeze([
  'Swiper Loop Warning: The number of slides is not enough for loop mode',
  "[Violation] 'setTimeout' handler took",
  '[Violation] Added non-passive event listener to a scroll-blocking',
  'THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN.',
])

const FILTERED_CONSOLE_METHODS = Object.freeze(['warn', 'info', 'log', 'debug', 'error'])
const ALREADY_INSTALLED = Symbol.for('portfolio.consoleNoiseFilter')

const isKnownNoise = value =>
  typeof value === 'string' && HIDDEN_CONSOLE_PATTERNS.some(pattern => value.includes(pattern))

const filterNoiseFrom = methodName => {
  const originalMethod = console[methodName]
  if (typeof originalMethod !== 'function') return

  console[methodName] = function filteredConsoleMethod(...args) {
    if (args.some(isKnownNoise)) return undefined

    return originalMethod.apply(this, args)
  }
}

if (typeof console !== 'undefined' && !console[ALREADY_INSTALLED]) {
  Object.defineProperty(console, ALREADY_INSTALLED, { value: true })
  FILTERED_CONSOLE_METHODS.forEach(filterNoiseFrom)
}
