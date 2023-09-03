/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser'
  },
  rules: {
    'vue/max-attributes-per-line': [2, {
      'singleline': 1,
      'multiline': {
        'max': 1,
        'allowFirstLine': false
      }
    }],
    'vue/order-in-components': ['error', {
      'order': [
        'directives'
      ]
    }],
    'comma-dangle': ['error', 'always-multiline'],
    'semi': ['error', 'never'],
    "vue/mustache-interpolation-spacing": ["error", "always"],
    '@typescript-eslint/no-unused-vars': 'error',
  }
}
