export const splitPreview = (items, previewCount) => {
  const all = items ?? []
  const visible = all.slice(0, previewCount)

  return { visible, hiddenCount: Math.max(0, all.length - visible.length) }
}
