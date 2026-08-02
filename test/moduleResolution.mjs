import { existsSync, statSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { registerHooks } from 'node:module'

const NON_JAVASCRIPT_ASSET = /\.(png|jpe?g|webp|gif|svg|glb|gltf|css|scss)(\?[^/]*)?$/
const RELATIVE_SPECIFIER = /^\.{1,2}\//
const ASSET_STUB_MODULE = 'data:text/javascript,export default "asset-stub"'
const IMPLICIT_SUFFIXES = ['.js', '.jsx', '/index.js', '/index.jsx']

const resolvedFileURL = (specifier, parentURL) => {
  const candidate = new URL(specifier, parentURL)
  const candidatePath = fileURLToPath(candidate)

  if (existsSync(candidatePath) && statSync(candidatePath).isFile()) return candidate

  for (const suffix of IMPLICIT_SUFFIXES) {
    const withSuffix = `${candidatePath}${suffix}`
    if (existsSync(withSuffix)) return pathToFileURL(withSuffix)
  }

  return null
}

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (NON_JAVASCRIPT_ASSET.test(specifier)) {
      return { url: ASSET_STUB_MODULE, format: 'module', shortCircuit: true }
    }

    if (RELATIVE_SPECIFIER.test(specifier) && context.parentURL) {
      const fileURL = resolvedFileURL(specifier, context.parentURL)
      if (fileURL) return { url: fileURL.href, format: 'module', shortCircuit: true }
    }

    return nextResolve(specifier, context)
  },
})
