module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    //'@rushstack/eslint-config/profile/web-app',
    'plugin:react/recommended',
    'prettier',
  ],
  plugins: ['react', 'prettier', '@typescript-eslint', 'simple-import-sort'],
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
  rules: {
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
    'react/prop-types': 'off',
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn'],
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-curly-brace-presence': [
      'error',
      { props: 'always', children: 'always' },
    ],
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
