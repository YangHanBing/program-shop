module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 'off',
    // 忽略命名规范
    "vue/multi-word-component-names": [
      "error",
      {
        ignores: ["index"], //需要忽略的组件名
      },
    ],
    // 缩进
    'indent': ['off', 2],
    'vue/comment-directive': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-mutating-props': 'off',
    'vue/no-parsing-error': 'off'
  }
}
