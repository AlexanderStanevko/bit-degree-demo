module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue/scss',
    'stylelint-config-rational-order',
  ],
  plugins: [
    'stylelint-order',
    'stylelint-config-rational-order/plugin',
  ],
  rules: {
    'scss/at-import-partial-extension': 'always',
    'scss/at-extend-no-missing-placeholder': null,
    'alpha-value-notation': 'number',
    'color-function-notation': 'modern',
    'declaration-block-no-redundant-longhand-properties': null,
    'no-descending-specificity': null,
    'selector-class-pattern': null,
  },
}