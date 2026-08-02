import { Html, useProgress } from '@react-three/drei'

const WRAPPER_STYLE = Object.freeze({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
})

const PROGRESS_STYLE = Object.freeze({
  fontSize: 14,
  color: '#F1F1F1',
  fontWeight: 800,
  marginTop: 40,
})

const PROGRESS_DECIMALS = 2

const CanvasLoader = () => {
  const { progress } = useProgress()

  return (
    <Html as='div' center style={WRAPPER_STYLE}>
      <span className='canvas-loader' />
      <p style={PROGRESS_STYLE}>{progress.toFixed(PROGRESS_DECIMALS)}%</p>
    </Html>
  )
}

export default CanvasLoader
