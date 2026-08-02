import { useEffect, useState } from 'react'

import { observeConnectionTier } from '../platform/connectionTier'

const useConnectionTier = () => {
  const [tier, setTier] = useState(null)

  useEffect(() => observeConnectionTier(setTier), [])

  return tier
}

export default useConnectionTier
