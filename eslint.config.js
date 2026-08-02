import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist/**', 'node_modules/**', '.lean-ctx/**', 'model-source/**'] },

  js.configs.recommended,

  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'no-unused-vars': ['error', { argsIgnorePattern: '^unused', varsIgnorePattern: '^unused' }],
      'no-console': 'error',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-var': 'error',
      'prefer-const': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-nested-ternary': 'error',
      'no-param-reassign': 'error',
      'no-implicit-coercion': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',
    },
  },

  {
    files: ['src/platform/consoleNoiseFilter.js'],
    rules: { 'no-console': 'off' },
  },

  {
    files: ['src/platform/threeBufferGeometryPatch.js'],
    rules: { 'no-param-reassign': 'off' },
  },

  {
    files: ['src/components/canvas/**/*.jsx'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },

  {
    files: [
      'src/**/*.test.js',
      'test/**/*.{js,mjs}',
      'e2e/**/*.js',
      'scripts/**/*.mjs',
      'eslint.config.js',
      'playwright.config.js',
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.node },
    },
    rules: { 'no-console': 'off' },
  },
]
