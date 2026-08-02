export const loopedSlides = (items, minimumSlideCount) => {
  if (items.length < 2) return items.map(item => ({ item, pass: 0 }))

  const passes = Math.ceil(minimumSlideCount / items.length)

  return Array.from({ length: passes }, (unused, pass) =>
    items.map(item => ({ item, pass }))
  ).flat()
}

export const symmetricNeighbourRadius = (slotOffsets, maxNeighboursPerSide) => {
  let slotsAhead = 0
  let slotsBehind = 0

  for (const offset of slotOffsets) {
    if (offset > 0 && offset <= maxNeighboursPerSide) slotsAhead += 1
    else if (offset < 0 && offset >= -maxNeighboursPerSide) slotsBehind += 1
  }

  return Math.min(slotsAhead, slotsBehind, maxNeighboursPerSide)
}

export const slideKey = (item, pass, index) =>
  `project-${pass}-${item.name || item.sourceCodeUrl || index}`
