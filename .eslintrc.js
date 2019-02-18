module.exports = {
  root: true,

  env: {
    node: true
  },

  parserOptions: {
    parser: 'babel-eslint'
  },

  rules: {
    'no-console': 'off'
  },

  extends: [
    'plugin:vue/strongly-recommended',
    'plugin:prettier/recommended',
    'eslint:recommended',
    '@vue/prettier'
  ]
}
