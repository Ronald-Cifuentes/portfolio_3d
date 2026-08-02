import { Canvas, useFrame } from '@react-three/fiber'
import { PointMaterial, Points, Preload } from '@react-three/drei'
import { Suspense, useRef, useState } from 'react'
import * as random from 'maath/random/dist/maath-random.esm'

import { isWebGLAvailable, skipBlockingShaderValidationInProduction } from '../../platform/webgl'
import useCanvasRecovery from '../../hooks/useCanvasRecovery'
import useInViewport from '../../hooks/useInViewport'

const RENDER_EVERY_FRAME = 'always'
const PARKED_WHILE_OFF_SCREEN = 'never'
const VIEWPORT_PREFETCH_MARGIN = '200px'

const STAR_COORDINATE_COUNT = 5000
const STAR_FIELD_RADIUS = 1.2
const COORDINATES_PER_POINT = 3
const STAR_SIZE = 0.002
const STAR_COLOUR = '#f272c8'
const TILT = [0, 0, Math.PI / 4]
const CAMERA = Object.freeze({ position: [0, 0, 1] })
const SECONDS_PER_X_ROTATION = 10
const SECONDS_PER_Y_ROTATION = 15

const StarField = () => {
  const pointsRef = useRef(null)
  const [coordinates] = useState(() =>
    random.inSphere(new Float32Array(STAR_COORDINATE_COUNT), { radius: STAR_FIELD_RADIUS })
  )

  useFrame((state, delta) => {
    if (!pointsRef.current) return

    pointsRef.current.rotation.x -= delta / SECONDS_PER_X_ROTATION
    pointsRef.current.rotation.y -= delta / SECONDS_PER_Y_ROTATION
  })

  return (
    <group rotation={TILT}>
      <Points ref={pointsRef} positions={coordinates} stride={COORDINATES_PER_POINT} frustumCulled>
        <PointMaterial
          transparent
          color={STAR_COLOUR}
          size={STAR_SIZE}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

const StarsCanvas = () => {
  const [setViewportNode, inViewport] = useInViewport(VIEWPORT_PREFETCH_MARGIN)
  const [setRecoveryNode, canvasGeneration] = useCanvasRecovery()

  if (!isWebGLAvailable) return null

  return (
    <div className='w-full h-auto absolute inset-0 z-0' ref={setViewportNode}>
      <Canvas
        key={canvasGeneration}
        camera={CAMERA}
        frameloop={inViewport ? RENDER_EVERY_FRAME : PARKED_WHILE_OFF_SCREEN}
        onCreated={({ gl }) => {
          skipBlockingShaderValidationInProduction(gl)
          setRecoveryNode(gl.domElement)
        }}
      >
        <Suspense fallback={null}>
          <StarField />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  )
}

export default StarsCanvas
