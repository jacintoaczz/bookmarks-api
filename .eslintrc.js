const RULES = {
  ERROR: 'error',
  OFF: 'off',
  WARN: 'warn',
};

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    // Warn
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    // Off
    '@typescript-eslint/interface-name-prefix': RULES.OFF,
    '@typescript-eslint/explicit-function-return-type': RULES.OFF,
    '@typescript-eslint/explicit-module-boundary-types': RULES.OFF,
    '@typescript-eslint/no-explicit-any': RULES.OFF,
  },
};

