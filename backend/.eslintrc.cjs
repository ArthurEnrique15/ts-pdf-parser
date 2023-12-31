module.exports = {
  extends: ['@rocketseat/eslint-config/node'],
  // plugins: ['simple-import-sort'],
  rules: {
    camelcase: 'off',
    '@typescript-eslint/no-namespace': 'off',
    'no-useless-constructor': 'off',
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
        tabWidth: 2,
        singleQuote: true,
        trailingComma: 'all',
        arrowParens: 'always',
        semi: false,
      },
    ],
  },
}
