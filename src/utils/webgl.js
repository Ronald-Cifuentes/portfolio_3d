


const detectWebGL = () => {
  try {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('webgl2') || canvas.getContext('webgl')
    return ctx !== null
  } catch {
    return false
  }
}


export const isWebGLAvailable = typeof document !== 'undefined' ? detectWebGL() : false
