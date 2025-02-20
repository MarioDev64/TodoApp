module.exports = {
  root: true,
  extends: ['plugin:prettier/recommended', 'plugin:tailwindcss/recommended'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', 'tests/**/*'],
      env: {
        jest: true,
      },
      parser: '@typescript-eslint/parser',
    },
  ],
  ignorePatterns: ['/dist/*'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'warn',
  },
};
