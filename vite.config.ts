import { defineConfig } from 'vite-plus';

export default defineConfig({
  fmt: {
    singleQuote: true,
    ignorePatterns: ['dist/**', 'coverage/**'],
  },
  lint: {
    plugins: ['oxc', 'typescript', 'unicorn'],
    categories: {
      correctness: 'error',
    },
    ignorePatterns: ['dist/**', 'coverage/**'],
    options: {
      typeAware: true,
      typeCheck: true,
    },
    jsPlugins: [
      '@stylistic/eslint-plugin',
      {
        name: 'vite-plus',
        specifier: 'vite-plus/oxlint-plugin',
      },
    ],
    rules: {
      curly: ['error', 'all'],
      '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: '*' },
        { blankLine: 'any', prev: 'import', next: 'import' },
        { blankLine: 'any', prev: 'export', next: 'export' },
        { blankLine: 'any', prev: ['const', 'let'], next: ['const', 'let'] },
        { blankLine: 'any', prev: 'expression', next: 'expression' },
      ],
      'vite-plus/prefer-vite-plus-imports': 'error',
    },
  },
  test: {
    testTimeout: 15000,
    coverage: {
      include: ['src'],
      reporter: ['text', 'lcov'],
    },
  },
  pack: {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    exports: true,
  },
});
