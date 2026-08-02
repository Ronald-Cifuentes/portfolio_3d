import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

const NEVER_INLINE_ASSETS_AS_DATA_URIS = 0

export default defineConfig({
  plugins: [react(), svgr({ svgrOptions: {} })],
  build: {
    assetsInlineLimit: NEVER_INLINE_ASSETS_AS_DATA_URIS,
  },
})
