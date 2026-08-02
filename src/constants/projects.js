import { SpotiClone, airlines, calculator, tourguides } from '../assets'

const TAG_COLOR = Object.freeze({
  black: 'black-text-gradient',
  blue: 'blue-text-gradient',
  fuchsia: 'fuchsia-text-gradient',
  green: 'green-text-gradient',
  lightBlue: 'light-blue-text-gradient',
  magenta: 'magenta-text-gradient',
  plain: 'text-white',
  purple: 'purple-text-gradient',
  violet: 'violet-text-gradient',
  white: 'white-text-gradient',
  yellow: 'yellow-text-gradient',
})

const tag = (name, color) => Object.freeze({ name, color })

const SHARED_TOOLING_TAGS = Object.freeze([
  tag('jest', TAG_COLOR.fuchsia),
  tag('testing-library', TAG_COLOR.plain),
  tag('babel', TAG_COLOR.yellow),
  tag('typescript', TAG_COLOR.violet),
  tag('husky', TAG_COLOR.black),
  tag('eslint', TAG_COLOR.purple),
  tag('prettier', TAG_COLOR.magenta),
])

const sharedToolingExcept = (...excludedNames) =>
  SHARED_TOOLING_TAGS.filter(({ name }) => !excludedNames.includes(name))

export const PROJECTS = Object.freeze([
  {
    name: 'SpotiClone',
    image: SpotiClone,
    sourceCodeUrl: 'https://github.com/Ronald-Cifuentes/next-spoticlone',
    tags: Object.freeze([
      tag('react', TAG_COLOR.blue),
      tag('nextjs', TAG_COLOR.white),
      tag('axios', TAG_COLOR.green),
      tag('tailwindcss', TAG_COLOR.lightBlue),
      ...sharedToolingExcept('testing-library', 'husky'),
    ]),
  },
  {
    name: 'Tour Guides',
    image: tourguides,
    sourceCodeUrl: 'https://github.com/Ronald-Cifuentes/tourguide',
    tags: Object.freeze([
      tag('react', TAG_COLOR.lightBlue),
      tag('vite', TAG_COLOR.yellow),
      tag('shepherd', TAG_COLOR.green),
      ...SHARED_TOOLING_TAGS,
    ]),
  },
  {
    name: 'Calculator',
    image: calculator,
    sourceCodeUrl: 'https://github.com/Ronald-Cifuentes/Calculator',
    tags: Object.freeze([
      tag('react', TAG_COLOR.blue),
      tag('create-react-app', TAG_COLOR.white),
      tag('Enzyme', TAG_COLOR.magenta),
      ...sharedToolingExcept('testing-library'),
    ]),
  },
  {
    name: 'Airlines',
    image: airlines,
    sourceCodeUrl: 'https://github.com/Ronald-Cifuentes/AirLines',
    tags: Object.freeze([
      tag('react', TAG_COLOR.blue),
      tag('create-react-app', TAG_COLOR.white),
      ...SHARED_TOOLING_TAGS,
    ]),
  },
])
