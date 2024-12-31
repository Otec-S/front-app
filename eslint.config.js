import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
// @ts-ignore
import importPlugin from "eslint-plugin-import"; // Импортируем плагин
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      sourceType: "module",
    },
    plugins: {
      // @ts-ignore
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin, // Добавляем плагин
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      ...reactHooks.configs.recommended.rules, // Рекомендуемая конфигурация
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      eqeqeq: ["error", "always"],
      "simple-import-sort/imports": [
        "warn",
        {
          groups: [
            ["^react", "^\\u0000", "^node:", "^@?\\w"],
            ["^(@pages|@components|@assets|@shared)(/.*|$)"],
            ["^\\.\\.(?!/?$)", "^\\.(?!/?$)", "^\\./?$", "^.+\\.(module.css)$"],
          ],
        },
      ],
      "simple-import-sort/exports": "warn",
      "react-hooks/rules-of-hooks": "error", // Если действительно есть необходимость
      "react-hooks/exhaustive-deps": "warn",
    },
  },
);
