module.exports = {
  'extends': ['eslint:recommended'],
  plugins: [
      'async-await'
  ],
  parserOptions: {
    ecmaVersion: 2017,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },
  parser: 'babel-eslint',
  env: {
    es6: true,
    node: true,
    browser: true,
    jasmine: true,
    jest: true,
    commonjs: true
  },
  globals: {
    document: false,
    window: false
  },
  rules: {
    'no-constant-condition': 0,
    'semi': ['error', 'never'],
    'curly': [2, 'multi-line'],
    'dot-location': [2, 'property'],
    'eol-last': 2,
    'eqeqeq': [2, 'always', {'null': 'ignore'}],
    'handle-callback-err': [2, '^(err|error)$' ],
    'indent': [2, 2, { 'SwitchCase': 1 }],
    'space-before-function-paren': ['error', 'always']
  }
}
