import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";

import prettierPlugin from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

import prettierConfig from "@wc/prettier-config"; 

export default [
  // prettier-config disables ESLint rules that conflict with Prettier
  eslintConfigPrettier,

  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: ["dist/**"],

    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true }
      }
    },

    plugins: {
      "@typescript-eslint": tseslint,
      react: reactPlugin,
      prettier: prettierPlugin
    },

    rules: {
      // Recommended rules
      ...tseslint.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,

      // Prettier as ESLint rule
      "prettier/prettier": ["error", prettierConfig],

      // Custom rules
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/ban-ts-comment": "off"
    },

    settings: {
      react: { version: "detect" }
    }
  }
];
