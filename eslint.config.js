import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin-js'
import stylisticTs from '@stylistic/eslint-plugin-ts'
import typescriptEslintParser  from '@typescript-eslint/parser'
import tseslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: [
      '**/*.ts',
      '**/*.js',
    ],
    plugins: {
      '@stylistic/js': stylisticJs,
      '@stylistic/ts': stylisticTs,
      import: importPlugin,
    },
    languageOptions: {
      parser: typescriptEslintParser,
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
    rules: {
      'no-multiple-empty-lines': ['error', { 'max': 2, 'maxEOF': 1, 'maxBOF': 0 }],
      'sort-vars': 'error',
      'sort-imports': [
        'error',
        {
          'allowSeparatedGroups': true,
          'ignoreCase': true,
          'ignoreDeclarationSort': true,
          'ignoreMemberSort': false,
          'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single'],
        },
      ],
      '@stylistic/ts/semi': ['error', 'never'],
      '@stylistic/ts/indent': ['error', 2],
      '@stylistic/ts/quotes': ['error', 'single'],
      '@stylistic/ts/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/ts/comma-spacing': ['error', { 'before': false, 'after': true }],
      '@stylistic/js/no-trailing-spaces': 'error',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      'import/order': ['error', {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'object', 'type'],
        'newlines-between': 'always-and-inside-groups',
      }],
    },
  },
]
