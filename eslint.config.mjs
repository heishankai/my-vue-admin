import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import tseslint from 'typescript-eslint'

const __dirname = dirname(fileURLToPath(import.meta.url))
const autoImportRaw = JSON.parse(
  readFileSync(join(__dirname, '.eslintrc-auto-import.json'), 'utf8'),
)
const autoImportGlobals = Object.fromEntries(
  Object.entries(autoImportRaw.globals).map(([key, val]) => [key, val ? 'readonly' : 'off']),
)

export default tseslint.config(
  {
    ignores: [
      'dist/**',
      'fitment-admin/**',
      'node_modules/**',
      'coverage/**',
      'src/components.d.ts',
      'src/auto-imports.d.ts',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginVue.configs['flat/recommended'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...autoImportGlobals,
      },
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      // Re-declare globals here: some ESLint IDE integrations only apply flat-config
      // languageOptions from the block that targets *.vue, so auto-imports were missing.
      globals: {
        ...globals.browser,
        ...autoImportGlobals,
      },
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    files: ['vite.config.ts', 'commitlint.config.mjs', 'eslint.config.mjs'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'vue/multi-word-component-names': 'off',
    },
  },
  eslintConfigPrettier,
)
