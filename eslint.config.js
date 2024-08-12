import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin-js'
import stylisticTs from '@stylistic/eslint-plugin-ts'
import typescriptEslintParser  from '@typescript-eslint/parser'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      '@stylistic/js': stylisticJs,
      '@stylistic/ts': stylisticTs,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'no-control-regex': 'off',
      'no-useless-catch': 'off',
      'no-multiple-empty-lines': ['error', { 'max': 2, 'maxEOF': 1, 'maxBOF': 0 }],
      'sort-vars': 'error',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      '@stylistic/ts/semi': ['error', 'never'],
      '@stylistic/ts/indent': ['error', 2],
      '@stylistic/ts/quotes': ['error', 'single'],
      '@stylistic/ts/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/ts/comma-spacing': ['error', { 'before': false, 'after': true }],
      '@stylistic/js/no-trailing-spaces': 'error',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
    },
    settings: {
      'import/extensions': ['.ts', '.js'],
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.js'],
      },
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.js',
    ],
    languageOptions: {
      globals: [globals.node],
      parser: typescriptEslintParser,
    },
  },
]
