const ACTIVATION_KEYS = Object.freeze(['Enter', ' '])

export const onActivationKey = activate => event => {
  if (!ACTIVATION_KEYS.includes(event.key)) return

  event.preventDefault()
  activate(event)
}
