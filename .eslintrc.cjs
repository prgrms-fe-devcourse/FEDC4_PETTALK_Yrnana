module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'standard-with-typescript',
    '@rushstack/eslint-config/profile/web-app',
    'prettier',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'simple-import-sort'],
  rules: {
    'react/prop-types': 'off',
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn'],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-curly-brace-presence': ['error', { props: 'always', children: 'always' }],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        selector: 'variable',
        leadingUnderscore: 'allow',
      },
      {
        format: ['camelCase', 'PascalCase'],
        selector: 'function',
      },
      {
        format: ['PascalCase'],
        selector: 'interface',
      },
      {
        format: ['PascalCase'],
        selector: 'typeAlias',
      },
    ],
  },
  parser: '@typescript-eslint/parser',
}
