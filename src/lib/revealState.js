export const REVEAL_STATE = Object.freeze({
  SCROLL_DRIVEN: 'scroll-driven',
  REVEALED: 'revealed',
  PENDING: 'pending',
})

export const revealStateOf = ({ scrollDriven, revealed }) => {
  if (scrollDriven) return REVEAL_STATE.SCROLL_DRIVEN
  if (revealed) return REVEAL_STATE.REVEALED

  return REVEAL_STATE.PENDING
}

export const isRevealed = state => state !== REVEAL_STATE.PENDING
