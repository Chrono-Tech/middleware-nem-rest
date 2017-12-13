# eslint-plugin-chronobank

> ESLint plugin for the ChronoBank related projects.

## Usage

1. `npm install ChronoBank/eslint-plugin-chronobank --save-dev`
2. Create a file named `.eslintrc` in your project:

```js
{
  extends: ['plugin:chronobank/recommended']
}
```

3. Add to your `package.json` (you'll probably need to change `src` and `specs` folders to your own):

```js
"scripts": {
  ...
  "lint": "./node_modules/eslint/bin/eslint.js --ext .js,.jsx --fix src specs",
  "lint:test": "./node_modules/eslint/bin/eslint.js --ext .js,.jsx src specs",
  "test": "npm run lint:test && jest --useStderr --forceExit --runInBand",
```

4. Use `npm test` before any commit and in your `travis.yml`:

```js
script:
  ...
  - npm test -- --coverage

after_script:
  - cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js
```

## Rules

### Extends

This package extends [eslint:recommended](http://eslint.org/docs/rules/)

### Overrides

This package overrides several rules:

| Override | Description | Reason  |
|--|--|--|
| `"no-constant-condition": 0` | [link](http://eslint.org/docs/rules/no-constant-condition) | We often use `const` declarations together with JSX checks |
| `"semi": ["error", "never"]` | [link](http://eslint.org/docs/rules/semi) | We hate them |
| `"no-case-declarations": 1` | [link](http://eslint.org/docs/rules/no-case-declarations) | Warning on case declarations (need code refactoring before setting "error" level) |
| `'curly': [2, 'multi-line']` | [link](http://eslint.org/docs/rules/curly) | Enforce curly braces in multiline blocks |
| `'dot-location': [2, 'property']` | [link](http://eslint.org/docs/rules/dot-location) | Enforce the dot to be on the same line as the property |
| `'eol-last': 2` | [link](http://eslint.org/docs/rules/eol-last) | Enforce new line at the end of file |
| `'eqeqeq': [2, 'always', {'null': 'ignore'}]` | [link](http://eslint.org/docs/rules/eqeqeq) | Enforce using of type-safe equality operators except the cases when it is `isNil` check |
| `'handle-callback-err': [2, '^(err&#124;error)$' ]` | [link](http://eslint.org/docs/rules/handle-callback-err) | Enforce handling of callback errors |
| `'indent': [2, 2, { 'SwitchCase': 1 }]` | [link](http://eslint.org/docs/rules/indent) | Enforce indent in switch statements |
| `'space-before-function-paren': ['error', 'always']` | [link](http://eslint.org/docs/rules/space-before-function-paren) | Enforce space before function parenthesis |

## License

[GPL-3.0](https://opensource.org/licenses/GPL-3.0)
