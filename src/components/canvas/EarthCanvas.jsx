import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'
import { Suspense } from 'react'

import '../../platform/threeBufferGeometryPatch'
import CanvasLoader from './CanvasLoader'
import { isWebGLAvailable, skipBlockingShaderValidationInProduction } from '../../platform/webgl'
import useCanvasRecovery from '../../hooks/useCanvasRecovery'
import useInViewport from '../../hooks/useInViewport'

const EARTH_MODEL = './planet/scene-opt.glb'
const RENDER_ON_DEMAND = 'demand'
const PARKED_WHILE_OFF_SCREEN = 'never'
const VIEWPORT_PREFETCH_MARGIN = '200px'
const EARTH_SCALE = 2.5

const CAMERA = Object.freeze({
  fov: 45,
  near: 0.1,
  far: 200,
  position: [-4, 3, 6],
})

const DEVICE_PIXEL_RATIO_RANGE = [1, 2]
const EQUATORIAL_ORBIT_ANGLE = Math.PI / 2

const Earth = () => {
  const earth = useGLTF(EARTH_MODEL)

  return <primitive object={earth.scene} scale={EARTH_SCALE} position-y={0} rotation-y={0} />
}

export const preloadEarthAssets = () => useGLTF.preload(EARTH_MODEL)

const EarthCanvas = () => {
  const [setViewportNode, inViewport] = useInViewport(VIEWPORT_PREFETCH_MARGIN)
  const [setRecoveryNode, canvasGeneration] = useCanvasRecovery()

  if (!isWebGLAvailable) return null

  return (
    <Canvas
      key={canvasGeneration}
      frameloop={inViewport ? RENDER_ON_DEMAND : PARKED_WHILE_OFF_SCREEN}
      dpr={DEVICE_PIXEL_RATIO_RANGE}
      camera={CAMERA}
      onCreated={({ gl }) => {
        skipBlockingShaderValidationInProduction(gl)
        setViewportNode(gl.domElement)
        setRecoveryNode(gl.domElement)
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={EQUATORIAL_ORBIT_ANGLE}
          minPolarAngle={EQUATORIAL_ORBIT_ANGLE}
        />
        <Earth />

        <Preload all />
      </Suspense>
    </Canvas>
  )
}

export default EarthCanvas
