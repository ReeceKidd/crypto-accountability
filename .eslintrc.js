module.exports = {
  root: true,
  extends: [
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:@typescript-eslint/recommended',
    'plugin:security/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'security'],
  env: {
    node: true
  },
  rules: {
    semi: ['error', 'never'],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'none',
          requireLast: false
        }
      }
    ],
    'prettier/prettier': 'error'
  }
};
