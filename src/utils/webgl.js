// WebGL availability detection utility
// Evaluated once at module load to avoid repeated canvas creation

const detectWebGL = () => {
  try {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('webgl2') || canvas.getContext('webgl')
    return ctx !== null
  } catch {
    return false
  }
}

// Evaluate once and cache
export const isWebGLAvailable = typeof document !== 'undefined' ? detectWebGL() : false
