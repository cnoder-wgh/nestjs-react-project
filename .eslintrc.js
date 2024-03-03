module.exports = {
  parser: 'vue-eslint-parser',
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
    window: 'readonly',
    Message: 'readonly',
    MessageBox: 'readonly',
    Notification: 'readonly',
    Loading: 'readonly',
  },
  rules: {
    camelcase: 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-useless-escape': 0,
    semi: [2, 'always'],
    '@typescript-eslint/no-explicit-any': ['off'],
    strict: 2,
    'no-var': 'error',
    'space-before-function-paren': 0,
    quotes: ['error', 'single'],
    'no-multiple-empty-lines': 'warn',
    'arrow-parens': 'off',
    'vue/arrow-spacing': 'error',
    'vue/block-spacing': 'error',
    'vue/brace-style': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'vue/attribute-hyphenation': 'off',
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          '{}': false,
        },
      },
    ],
    '@typescript-eslint/triple-slash-reference': 'off',
    'vue/no-mutating-props': 0,
    'no-param-reassign': [
      'error',
      {
        ignorePropertyModificationsFor: ['Vue'],
      },
    ],
    '@typescript-eslint/no-this-alias': [
      'error',
      {
        allowedNames: ['self'], // Allow `const self = this`; `[]` by default
      },
    ],
    'import/first': 0,
    'no-underscore-dangle': 0,
    'prefer-rest-params': 0,
    '@typescript-eslint/no-var-requires': 0,
  },
};
