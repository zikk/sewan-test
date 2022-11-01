module.exports = {
  extends: ['airbnb-base', 'airbnb-typescript/base', 'plugin:prettier/recommended'],
  plugins: ['prettier'],

  parserOptions: {
    project: './tsconfig.json',
    include: ['src/**/*.ts'],
  },

  rules: {
    'prettier/prettier': 'error',
    'import/prefer-default-export': 0,
    'max-classes-per-file': 0,
    'lines-between-class-members': 0,
    '@typescript-eslint/no-use-before-define': 0,
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-restricted-exports': 0,
  },
};
