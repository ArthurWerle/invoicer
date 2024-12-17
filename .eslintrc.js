module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error', {
      singleQuote: true,
      semi: false,
      trailingComma: 'es5',
      printWidth: 80
    }]
  }
  }