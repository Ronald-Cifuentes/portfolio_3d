declare module '*.svg' {
  const source: string
  export default source
}

declare module '*.svg?react' {
  import type { FC, SVGProps } from 'react'
  const ReactComponent: FC<SVGProps<SVGSVGElement>>
  export default ReactComponent
}

declare module '*.png' {
  const source: string
  export default source
}

declare module '*.webp' {
  const source: string
  export default source
}
