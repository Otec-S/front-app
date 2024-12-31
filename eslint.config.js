import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
// @ts-ignore
import importPlugin from "eslint-plugin-import"; // Импортируем плагин

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      // @ts-ignore
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin, // Добавляем плагин
    },
    rules: {
      ...reactHooks.configs.recommended.rules, // Рекомендуемая конфигурация
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // Настройка других уникальных правил после spread оператора
      "import/order": [
        "warn",
        {
          alphabetize: { order: "asc", caseInsensitive: true },
          "newlines-between": "always",
        },
      ],
      // Теперь здесь можете переопределять только если это необходимо
      "react-hooks/rules-of-hooks": "error", // Если действительно есть необходимость
      "react-hooks/exhaustive-deps": "warn",
    },
  },
);
