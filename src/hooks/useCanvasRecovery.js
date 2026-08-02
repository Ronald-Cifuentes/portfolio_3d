import { useEffect, useState } from 'react'

const WAIT_FOR_BROWSER_RESTORE_MS = 2000
const MAX_REBUILD_ATTEMPTS = 2

const useCanvasRecovery = () => {
  const [canvas, setCanvas] = useState(null)
  const [canvasGeneration, setCanvasGeneration] = useState(0)

  useEffect(() => {
    if (!canvas) return undefined

    let rebuildTimer

    const rebuildUnlessBrowserRestoresContext = () => {
      window.clearTimeout(rebuildTimer)
      rebuildTimer = window.setTimeout(() => {
        setCanvasGeneration(current => (current >= MAX_REBUILD_ATTEMPTS ? current : current + 1))
      }, WAIT_FOR_BROWSER_RESTORE_MS)
    }

    const cancelPendingRebuild = () => window.clearTimeout(rebuildTimer)

    canvas.addEventListener('webglcontextlost', rebuildUnlessBrowserRestoresContext)
    canvas.addEventListener('webglcontextrestored', cancelPendingRebuild)

    return () => {
      window.clearTimeout(rebuildTimer)
      canvas.removeEventListener('webglcontextlost', rebuildUnlessBrowserRestoresContext)
      canvas.removeEventListener('webglcontextrestored', cancelPendingRebuild)
    }
  }, [canvas])

  return [setCanvas, canvasGeneration]
}

export default useCanvasRecovery
