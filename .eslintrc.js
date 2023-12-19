module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
    es6: true,
  },
  extends: [
    "eslint:recommended",
    "eslint-config-prettier",
    "plugin:prettier/recommended",
    "prettier",
  ],
  //   overrides: [],
  //   settings: {},
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["import", "@typescript-eslint"],
  rules: {
    "no-console": "off",
    "prettier/prettier": [
      "warn",
      {
        singleQuote: true,
        semi: true,
        trailingComma: "es5",
        tabWidth: 2,
        quoteProps: "as-needed",
        printWidth: 120,
        htmlWhitespaceSensitivity: "css",
      },
    ],
  },
};
