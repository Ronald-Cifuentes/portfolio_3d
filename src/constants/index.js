import {
  Acid,
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
  Bold,
  Bootstrap,
  Bulma,
  C,
  CCF,
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
  ITG,
  Java,
  Javascript,
  Jest,
  Laravel,
  Less,
  Mantum,
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
  Sena,
  Softgic,
  Solidity,
  Spline,
  SpotiClone,
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
  Treinta,
  Typescript,
  Vercel,
  VsCode,
  Vue,
  YII,
  ZendFramework,
  ai,
  airlines,
  backend,
  calculator,
  cloud,
  creator,
  databases,
  design,
  frontend,
  method,
  testing,
  tourguides,
  versions,
  web,
  web3,
} from '../assets'

export const navLinks = [
  {
    id: 'home',
    title: 'Home',
  },
  {
    id: 'work',
    title: 'Work',
  },
  {
    id: 'projects',
    title: 'Projects',
  },
  {
    id: 'skills',
    title: 'Skills',
  },
  {
    id: 'contact',
    title: 'Contact',
  },
]

export const experiences = [
  {
    title: 'Senior Angular Frontend Developer',
    company_name: 'Bold.co',
    icon: Bold,
    iconBg: '#383E56',
    date: 'February 2024 - Present',
    location: 'Remote',
    summary:
      'Senior frontend engineer building Angular + TypeScript SPAs and platforms shipped through continuous delivery, with a focus on reusable architecture, performance and measurable impact.',
    technologies: [
      'Angular',
      'TypeScript',
      'RxJS',
      'NgRx',
      'GraphQL',
      'REST APIs',
      'Unit & E2E Testing',
      'CI/CD',
    ],
    points: [
      'Production: Angular + TypeScript SPAs/platforms with continuous delivery and high stability.',
      'Architecture: Reusable modules/libraries, design patterns, and well-separated responsibilities.',
      'State/Reactive: Advanced RxJS, NgRx when appropriate, robust forms and validations.',
      'UI/UX: Design systems, reusable components, accessibility, and responsive design.',
      'Performance: Lazy loading, bundle optimization, rendering, and performance metrics (Lighthouse/Core Web Vitals).',
      'Quality/Delivery: Unit/E2E testing, CI/CD, code reviews, and maintainable documentation.',
      'Integration: REST/GraphQL APIs and collaboration with backend teams (Node/TS, databases, cloud).',
      'Leadership: Mentoring, estimation, and coordination with Design/PM teams to deliver measurable impact.',
    ],
  },
  {
    title: 'Sr React Developer & FullStack',
    company_name: 'Acid Labs',
    icon: Acid,
    iconBg: '#383E56',
    date: 'February 2023 - Present',
    location: 'Remote',
    summary:
      'Senior full-stack engineer designing and scaling micro-frontend architectures for enterprise products — from shared component libraries to production-grade React applications.',
    technologies: [
      'React',
      'TypeScript',
      'Webpack',
      'Module Federation',
      'Material UI',
      'Jest',
      'Cypress',
      'Node.js',
    ],
    points: [
      'Architect and maintain multiple repositories with Webpack Module Federation, composing independently deployable micro-frontends into cohesive products.',
      'Translate designs and mockups into pixel-accurate, accessible interfaces with React, TypeScript and Material UI.',
      'Safeguard reliability through automated testing — unit suites in Jest and end-to-end coverage in Cypress.',
      'Drive continuous improvement of the development workflow, championing best practices and optimizing recurring tasks across the team.',
    ],
  },
  {
    title: 'Sr React Developer',
    company_name: 'Treinta',
    icon: Treinta,
    iconBg: '#E6DEDD',
    date: 'June 2022 - May 2023',
    location: 'Remote',
    summary:
      'Built and maintained web experiences for a fintech platform empowering small businesses across Latin America to manage their finances.',
    technologies: ['React', 'JavaScript', 'Redux', 'Responsive Design', 'REST APIs', 'Git'],
    points: [
      'Developed and maintained web applications using React.js and its surrounding ecosystem.',
      'Collaborated with cross-functional teams — designers, product managers and fellow developers — to ship high-quality, user-centered products.',
      'Implemented responsive layouts and ensured consistent cross-browser compatibility.',
      'Participated in code reviews, giving constructive feedback that raised the team’s overall code quality.',
    ],
  },
  {
    title: 'Sr React Developer',
    company_name: 'It Globers',
    icon: ITG,
    iconBg: '#383E56',
    date: 'September 2021 - May 2022',
    location: 'Remote',
    summary:
      'Delivered tailored e-commerce experiences on the VTEX platform, turning designs into performant storefronts.',
    technologies: ['React', 'VTEX', 'JavaScript', 'E-commerce', 'Git'],
    points: [
      'Created customized e-commerce solutions, tailoring each storefront to the client’s needs.',
      'Translated designs and mockups into React and VTEX components alongside other supporting technologies.',
      'Proposed continuous improvements to the development process, streamlining and optimizing recurring tasks.',
      'Reviewed peers’ code and provided constructive feedback to strengthen the codebase.',
    ],
  },
  {
    title: 'React Frontend & Fullstack Analyst',
    company_name: 'Softgic',
    icon: Softgic,
    iconBg: '#E6DEDD',
    date: 'July 2020 - August 2021',
    location: 'Medellín, Colombia',
    summary:
      'Analyst and developer bridging design and engineering, delivering intuitive interfaces built on solid, secure information architecture.',
    technologies: ['React', 'JavaScript', 'UX/UI', 'Node.js', 'Security Standards'],
    points: [
      'Anticipated risks by proposing solutions in the early stages of each project, preventing collateral damage later on.',
      'Translated designs and mockups into clean, maintainable code.',
      'Applied best practices in interactivity and User Experience (UX) to deliver intuitive interfaces.',
      'Ensured the correct implementation of information architecture in line with security standards.',
    ],
  },
  {
    title: 'Software Developer & Tester',
    company_name: 'Mantum',
    icon: Mantum,
    iconBg: '#E6DEDD',
    date: 'August 2019 - June 2020',
    location: 'Medellín, Colombia',
    summary:
      'Full-cycle developer and tester on the Mantum CMMS — a computerized maintenance management system — combining feature work with quality assurance.',
    technologies: ['JavaScript', 'PHP', 'SQL', 'Scrum', 'QA / Testing', 'Databases'],
    points: [
      'Developed, extended and fixed modules of the Mantum CMMS (computerized maintenance management system).',
      'Performed QA and proposed continuous improvements to the product.',
      'Worked within Agile (Scrum) methodologies, pairing development with quality assurance.',
      'Designed and managed the relational databases powering the system.',
    ],
  },
  {
    title: 'Software Developer | Technician In Systems, Electronics & Electricity',
    company_name: 'Freelancer',
    icon: CCF,
    iconBg: '#E6DEDD',
    date: 'January 2018 - August 2019',
    location: 'Medellín, Colombia',
    summary:
      'Independent developer and technician delivering web projects and hardware services across software, electronics and electrical systems.',
    technologies: ['PHP', 'HTML', 'CSS', 'JavaScript', 'Electronics'],
    points: [
      'Built and maintained landing pages and web applications with PHP, HTML, CSS and JavaScript.',
      'Provided cell-phone repair and technical services.',
      'Supported the Christian Faith Community with IT systems — assembly, maintenance and repair — plus large public LED signage and a broad range of audio and electronic systems.',
    ],
  },
  {
    title: 'Instructor & Researcher',
    company_name: 'Sena',
    icon: Sena,
    iconBg: '#E6DEDD',
    date: 'March 2016 - December 2017',
    location: 'Colombia',
    summary:
      'Instructor and researcher developing embedded systems and industrial hardware while teaching the next generation of technicians.',
    technologies: ['C', 'C++', 'Python', 'VB.Net', 'Embedded Systems', 'Firmware'],
    points: [
      'Developed control software for National Instruments embedded systems in C and C++.',
      'Built software, firmware and hardware for public LED display boards using PIC C, VB.Net and Python.',
      'Led the design, prototyping and construction of an induction-hardening machine for industrial use.',
    ],
  },
]

export const services = [
  {
    title: 'Web Layout',
    icon: web,
  },
  {
    title: 'Frontend Developer',
    icon: frontend,
  },
  {
    title: 'Backend Developer',
    icon: backend,
  },
  {
    title: 'Designer UX/UI',
    icon: design,
  },
  {
    title: 'AI & Machine Learning',
    icon: ai,
  },
  {
    title: 'Data Bases',
    icon: databases,
  },
  {
    title: 'Deployment & Cloud',
    icon: cloud,
  },
  {
    title: 'Testing and Security',
    icon: testing,
  },
  {
    title: 'Control Versions',
    icon: versions,
  },
  {
    title: 'Web 3',
    icon: web3,
  },
  {
    title: 'Methodologies',
    icon: method,
  },
  {
    title: 'Editors And Shortcuts',
    icon: creator,
  },
]

export const WebLayout = [
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
]
export const FrontendDeveloper = [
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
]
export const BackendDeveloper = [
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
]
export const DesignerUXUI = [
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
]
export const PromptEnginering = [
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
]
export const Databases = [
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
]
export const DeploymentAndCloud = [
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
]
export const TestingAndSecurity = [
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
]
export const ControlVersions = [
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
]
export const Web3 = [
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
]

export const Methodologies = [
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
]

export const EditorsAndShortcuts = [
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
]

const basicTech1 = [
  {
    name: 'jest',
    color: 'fuchsia-text-gradient',
  },
  {
    name: 'testing-library',
    color: 'text-white',
  },
  {
    name: 'babel',
    color: 'yellow-text-gradient',
  },
  {
    name: 'typescript',
    color: 'violet-text-gradient',
  },
  {
    name: 'husky',
    color: 'black-text-gradient',
  },
  {
    name: 'eslint',
    color: 'purple-text-gradient',
  },
  {
    name: 'prettier',
    color: 'magenta-text-gradient',
  },
]

export const projects = [
  {
    name: 'SpotiClone',
    tags: [
      {
        name: 'react',
        color: 'blue-text-gradient',
      },
      {
        name: 'nextjs',
        color: 'white-text-gradient',
      },
      {
        name: 'axios',
        color: 'green-text-gradient',
      },
      {
        name: 'tailwindcss',
        color: 'light-blue-text-gradient',
      },
      ...basicTech1.filter(x => x.name !== 'testing-library' && x.name !== 'husky'),
    ],
    image: SpotiClone,
    source_code_link: 'https://github.com/Ronald-Cifuentes/next-spoticlone',
  },
  {
    name: 'Tour Guides',
    tags: [
      {
        name: 'react',
        color: 'light-blue-text-gradient',
      },
      {
        name: 'vite',
        color: 'yellow-text-gradient',
      },
      {
        name: 'shepherd',
        color: 'green-text-gradient',
      },
      ...basicTech1,
    ],
    image: tourguides,
    source_code_link: 'https://github.com/Ronald-Cifuentes/tourguide',
  },
  {
    name: 'Calculator',
    tags: [
      {
        name: 'react',
        color: 'blue-text-gradient',
      },
      {
        name: 'create-react-app',
        color: 'white-text-gradient',
      },
      {
        name: 'Enzyme',
        color: 'magenta-text-gradient',
      },
      ...basicTech1.filter(x => x.name !== 'testing-library'),
    ],
    image: calculator,
    source_code_link: 'https://github.com/Ronald-Cifuentes/Calculator',
  },
  {
    name: 'Airlines',
    tags: [
      {
        name: 'react',
        color: 'blue-text-gradient',
      },
      {
        name: 'create-react-app',
        color: 'white-text-gradient',
      },
      ...basicTech1,
    ],
    image: airlines,
    source_code_link: 'https://github.com/Ronald-Cifuentes/AirLines',
  },
]
