// https://github.com/francoismassart/eslint-plugin-tailwindcss
module.exports = {
  root: true,
  extends: ['plugin:prettier/recommended', 'plugin:tailwindcss/recommended'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js'],
      parser: '@typescript-eslint/parser',
    },
  ],
  ignorePatterns: ['/dist/*'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'warn',
  },
};
