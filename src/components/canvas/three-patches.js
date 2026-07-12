const NAN_WARNING = 'THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN.'
const origConsoleError = console.error
console.error = function (msg, ...rest) {
  if (typeof msg === 'string' && msg.startsWith(NAN_WARNING)) return
  return origConsoleError.call(console, msg, ...rest)
}

import * as THREE from 'three'

const orig = THREE.BufferGeometry.prototype.computeBoundingSphere
THREE.BufferGeometry.prototype.computeBoundingSphere = function () {
  const pos = this.attributes?.position
  if (pos) {
    const arr = pos.array
    for (let i = 0; i < arr.length; i++) {
      if (!Number.isFinite(arr[i])) arr[i] = 0
    }
    pos.needsUpdate = true
  }
  return orig.call(this)
}
