import { useSyncExternalStore } from 'react'

import { areDeferredChunksReady, subscribeToDeferredChunks } from '../platform/deferredChunks'

const useDeferredChunksReady = () =>
  useSyncExternalStore(subscribeToDeferredChunks, areDeferredChunksReady, () => false)

export default useDeferredChunksReady
