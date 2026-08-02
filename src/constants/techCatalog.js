import {
  AdobeIllustrator,
  AdobeXD,
  Agil,
  Angular,
  AtomicDesign,
  Azure,
  Bing,
  Bitbucket,
  Bitcoin,
  Blender,
  Bootstrap,
  Bulma,
  C,
  CCS,
  CPP,
  CSHARP,
  Chai,
  ChatGPT,
  CodeIgniter,
  Css,
  Cypress,
  DesignPatterns,
  DevOps,
  Django,
  Docker,
  Document,
  Emmet,
  Ether,
  Express,
  Figma,
  Firebase,
  Git,
  Github,
  Gitlab,
  GraphQL,
  Html,
  Java,
  Javascript,
  Jest,
  Laravel,
  Less,
  Mocha,
  MongoDB,
  MySQL,
  NestJs,
  NetCore,
  Netlify,
  Nodejs,
  OWASPZap,
  Photoshop,
  Php,
  PostgeSQL,
  Python,
  ReactNative,
  ReactiveX,
  Reactjs,
  Redux,
  Sass,
  Scrum,
  Selenium,
  Solidity,
  Spline,
  SpringBoot,
  SqlServer,
  StableDiffusion,
  Storybook,
  Stylus,
  SublimeText,
  Svelte,
  TDD,
  TailwindCSS,
  Terminal,
  Threejs,
  Typescript,
  Vercel,
  VsCode,
  Vue,
  YII,
  ZendFramework,
  ai,
  backend,
  cloud,
  creator,
  databases,
  design,
  frontend,
  method,
  testing,
  versions,
  web,
  web3,
} from '../assets'

export const TECH_CATEGORIES = Object.freeze([
  {
    id: 'web-layout',
    title: 'Web Layout',
    icon: web,
    techs: [
      {
        name: 'Css',
        icon: Css,
      },
      {
        name: 'Html',
        icon: Html,
      },
      {
        name: 'AtomicDesign',
        icon: AtomicDesign,
      },
      {
        name: 'Sass',
        icon: Sass,
      },
      {
        name: 'Less',
        icon: Less,
      },
      {
        name: 'Stylus',
        icon: Stylus,
      },
      {
        name: 'Storybook',
        icon: Storybook,
      },
      {
        name: 'Bulma',
        icon: Bulma,
      },
      {
        name: 'TailwindCSS',
        icon: TailwindCSS,
      },
      {
        name: 'Bootstrap',
        icon: Bootstrap,
      },
    ],
  },
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    icon: frontend,
    techs: [
      {
        name: 'JavaScript',
        icon: Javascript,
      },
      {
        name: 'TypeScript',
        icon: Typescript,
      },
      {
        name: 'React JS',
        icon: Reactjs,
      },
      {
        name: 'Angular',
        icon: Angular,
      },
      {
        name: 'Vue',
        icon: Vue,
      },
      {
        name: 'Svelte',
        icon: Svelte,
      },
      {
        name: 'Redux Toolkit',
        icon: Redux,
      },
      {
        name: 'Reactive X',
        icon: ReactiveX,
      },
      {
        name: 'Three JS',
        icon: Threejs,
      },
      {
        name: 'React Native',
        icon: ReactNative,
      },
    ],
  },
  {
    id: 'backend-developer',
    title: 'Backend Developer',
    icon: backend,
    techs: [
      {
        name: 'JavaScript',
        icon: Javascript,
      },
      {
        name: 'TypeScript',
        icon: Typescript,
      },
      {
        name: 'Node JS',
        icon: Nodejs,
      },
      {
        name: 'NestJs',
        icon: NestJs,
      },
      {
        name: 'Express',
        icon: Express,
      },
      {
        name: 'GraphQL',
        icon: GraphQL,
      },
      {
        name: 'Java',
        icon: Java,
      },
      {
        name: 'Spring Boot',
        icon: SpringBoot,
      },
      {
        name: 'Python',
        icon: Python,
      },
      {
        name: 'Django',
        icon: Django,
      },
      {
        name: 'C',
        icon: C,
      },
      {
        name: 'C++',
        icon: CPP,
      },
      {
        name: 'C#',
        icon: CSHARP,
      },
      {
        name: '.Net Core',
        icon: NetCore,
      },
      {
        name: 'CCS',
        icon: CCS,
      },
      {
        name: 'Php',
        icon: Php,
      },
      {
        name: 'Laravel',
        icon: Laravel,
      },
      {
        name: 'Codeigniter',
        icon: CodeIgniter,
      },
      {
        name: 'YII',
        icon: YII,
      },
      {
        name: 'Zend Framework',
        icon: ZendFramework,
      },
    ],
  },
  {
    id: 'designer-ux-ui',
    title: 'Designer UX/UI',
    icon: design,
    techs: [
      {
        name: 'Adobe Illustrator',
        icon: AdobeIllustrator,
      },
      {
        name: 'Photoshop',
        icon: Photoshop,
      },
      {
        name: 'Adobe XD',
        icon: AdobeXD,
      },
      {
        name: 'Figma',
        icon: Figma,
      },
      {
        name: 'Blender',
        icon: Blender,
      },
      {
        name: 'Spline',
        icon: Spline,
      },
    ],
  },
  {
    id: 'ai-machine-learning',
    title: 'AI & Machine Learning',
    icon: ai,
    techs: [
      {
        name: 'Bing',
        icon: Bing,
      },
      {
        name: 'ChatGPT',
        icon: ChatGPT,
      },
      {
        name: 'Stable Diffusion',
        icon: StableDiffusion,
      },
    ],
  },
  {
    id: 'databases',
    title: 'Data Bases',
    icon: databases,
    techs: [
      {
        name: 'MongoDB',
        icon: MongoDB,
      },
      {
        name: 'MySQL',
        icon: MySQL,
      },
      {
        name: 'PostgeSQL',
        icon: PostgeSQL,
      },
      {
        name: 'SQL Server',
        icon: SqlServer,
      },
    ],
  },
  {
    id: 'deployment-cloud',
    title: 'Deployment & Cloud',
    icon: cloud,
    techs: [
      {
        name: 'Azure',
        icon: Azure,
      },
      {
        name: 'DevOps',
        icon: DevOps,
      },
      {
        name: 'Docker',
        icon: Docker,
      },
      {
        name: 'Firebase',
        icon: Firebase,
      },
      {
        name: 'Netlify',
        icon: Netlify,
      },
      {
        name: 'Terminal',
        icon: Terminal,
      },
      {
        name: 'Vercel',
        icon: Vercel,
      },
    ],
  },
  {
    id: 'testing-security',
    title: 'Testing and Security',
    icon: testing,
    techs: [
      {
        name: 'Cypress',
        icon: Cypress,
      },
      {
        name: 'Jest',
        icon: Jest,
      },
      {
        name: 'Mocha',
        icon: Mocha,
      },
      {
        name: 'Chai',
        icon: Chai,
      },
      {
        name: 'OWASPZap',
        icon: OWASPZap,
      },
      {
        name: 'Selenium',
        icon: Selenium,
      },
    ],
  },
  {
    id: 'control-versions',
    title: 'Control Versions',
    icon: versions,
    techs: [
      {
        name: 'Git',
        icon: Git,
      },
      {
        name: 'Github',
        icon: Github,
      },
      {
        name: 'Gitlab',
        icon: Gitlab,
      },
      {
        name: 'Bitbucket',
        icon: Bitbucket,
      },
    ],
  },
  {
    id: 'web3',
    title: 'Web 3',
    icon: web3,
    techs: [
      {
        name: 'Bitcoin',
        icon: Bitcoin,
      },
      {
        name: 'Ether',
        icon: Ether,
      },
      {
        name: 'Solidity',
        icon: Solidity,
      },
    ],
  },
  {
    id: 'methodologies',
    title: 'Methodologies',
    icon: method,
    techs: [
      {
        name: 'Agil',
        icon: Agil,
      },
      {
        name: 'DesignPatterns',
        icon: DesignPatterns,
      },
      {
        name: 'Document',
        icon: Document,
      },
      {
        name: 'Scrum',
        icon: Scrum,
      },
      {
        name: 'TDD',
        icon: TDD,
      },
    ],
  },
  {
    id: 'editors-shortcuts',
    title: 'Editors And Shortcuts',
    icon: creator,
    techs: [
      {
        name: 'Emmet',
        icon: Emmet,
      },
      {
        name: 'SublimeText',
        icon: SublimeText,
      },
      {
        name: 'VsCode',
        icon: VsCode,
      },
    ],
  },
])
