module.exports = {
    root: true,
    extends: [
      'prettier',
      'prettier/@typescript-eslint',
      'plugin:@typescript-eslint/recommended',
      'plugin:security/recommended',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier', 'security'],
    env: {
      node: true,
    },
    rules: {
      semi: ['error', 'never'],
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/member-delimiter-style': [
        'error',
        {
          multiline: {
            delimiter: 'none',
            requireLast: false,
          },
        },
      ],
      'prettier/prettier': 'error',
      'security/detect-unsafe-regex': 'error',
      'security/detect-buffer-noassert': 'error',
      'security/detect-child-process': 'error',
      'security/detect-disable-mustache-escape': 'error',
      'security/detect-eval-with-expression': 'error',
      'security/detect-no-csrf-before-method-override': 'error',
      'security/detect-non-literal-fs-filename': 'error',
      'security/detect-non-literal-regexp': 'error',
      'security/detect-non-literal-require': 'error',
      'security/detect-object-injection': 'error',
      'security/detect-possible-timing-attacks': 'error',
      'security/detect-pseudoRandomBytes': 'error',
    },
    overrides: [
      {
        files: ['**/*.spec.ts'],
        rules: {
          '@typescript-eslint/no-var-requires': 'off',
          '@typescript-eslint/no-explicit-any': 'off',
          'security/detect-unsafe-regex': 'off',
          'security/detect-buffer-noassert': 'off',
          'security/detect-child-process': 'off',
          'security/detect-disable-mustache-escape': 'off',
          'security/detect-eval-with-expression': 'off',
          'security/detect-no-csrf-before-method-override': 'off',
          'security/detect-non-literal-fs-filename': 'off',
          'security/detect-non-literal-regexp': 'off',
          'security/detect-non-literal-require': 'off',
          'security/detect-object-injection': 'off',
          'security/detect-possible-timing-attacks': 'off',
          'security/detect-pseudoRandomBytes': 'off',
        },
        env: {
          jest: true,
        },
      },
      {
        files: ['tools/**'],
        rules: {
          'security/detect-non-literal-fs-filename': 'off',
          '@typescript-eslint/explicit-function-return-type': 'off',
        },
      },
    ],
  }
  