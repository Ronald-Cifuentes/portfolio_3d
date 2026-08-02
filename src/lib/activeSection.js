export const NO_VISIBLE_SECTION = null

export const mostVisibleSectionId = visibilityRatioBySectionId => {
  let mostVisibleId = NO_VISIBLE_SECTION
  let highestRatio = 0

  for (const [sectionId, ratio] of visibilityRatioBySectionId) {
    if (ratio > highestRatio) {
      highestRatio = ratio
      mostVisibleId = sectionId
    }
  }

  return mostVisibleId
}
