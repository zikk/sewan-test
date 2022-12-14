module.exports = {
  env: {
    node: true,
    jest: true,
  },

  extends: ['airbnb-base', 'airbnb-typescript/base', 'plugin:prettier/recommended'],
  plugins: ['prettier'],

  parserOptions: {
    project: './tsconfig.eslint.json',
  },

  rules: {
    'prettier/prettier': 'error',
    'import/prefer-default-export': 0,
    'max-classes-per-file': 0,
    '@typescript-eslint/lines-between-class-members': 0,
    '@typescript-eslint/no-use-before-define': 0,
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-restricted-exports': 0,
  },
};
