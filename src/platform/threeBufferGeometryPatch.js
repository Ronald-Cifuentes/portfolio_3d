import * as THREE from 'three'

const SAFE_COORDINATE = 0

const replaceNonFiniteCoordinates = positions => {
  const coordinates = positions.array
  let replacedAny = false

  for (let index = 0; index < coordinates.length; index += 1) {
    if (Number.isFinite(coordinates[index])) continue

    coordinates[index] = SAFE_COORDINATE
    replacedAny = true
  }

  if (replacedAny) positions.needsUpdate = true
}

const computeBoundingSphere = THREE.BufferGeometry.prototype.computeBoundingSphere

THREE.BufferGeometry.prototype.computeBoundingSphere = function computeFiniteBoundingSphere() {
  const positions = this.attributes?.position
  if (positions) replaceNonFiniteCoordinates(positions)

  return computeBoundingSphere.call(this)
}
