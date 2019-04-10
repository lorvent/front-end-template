const stylelintConfigRecessOrder = require('stylelint-config-recess-order')

module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-prettier/recommended'],
  plugins: ['stylelint-order', 'stylelint-scss'],
  rules: {
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['first-nested', 'blockless-after-same-name-blockless'],
        ignore: ['after-comment'],
        ignoreAtRules: ['else']
      }
    ],
    'at-rule-no-unknown': null,
    'color-named': 'never',
    'declaration-no-important': true,
    'font-family-name-quotes': 'always-unless-keyword',
    'font-weight-notation': 'numeric',
    'function-calc-no-invalid': true,
    'no-empty-source': null,
    'rule-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment']
      }
    ],
    'order/order': [
      [
        'custom-properties',
        'dollar-variables',
        {
          type: 'at-rule',
          name: 'extend'
        },
        {
          type: 'at-rule',
          name: 'include',
          hasBlock: false
        },
        'declarations',
        {
          type: 'at-rule',
          hasBlock: true
        },
        {
          type: 'at-rule',
          name: 'include',
          hasBlock: true
        },
        {
          type: 'rule',
          selector: '/^&:\\w/'
        },
        {
          type: 'rule',
          selector: '/^&::\\w/'
        },
        'rules'
      ]
    ],
    'order/properties-order': [
      stylelintConfigRecessOrder.rules['order/properties-order'],
      {
        unspecified: 'bottomAlphabetical'
      }
    ],
    'scss/at-mixin-argumentless-call-parentheses': 'always',
    'scss/at-rule-no-unknown': true,
    'scss/declaration-nested-properties': 'never',
    'scss/double-slash-comment-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['stylelint-commands']
      }
    ],
    'scss/double-slash-comment-inline': [
      'never',
      {
        ignore: ['stylelint-commands']
      }
    ],
    'scss/double-slash-comment-whitespace-inside': 'always',
    'scss/selector-no-redundant-nesting-selector': true
  }
}
