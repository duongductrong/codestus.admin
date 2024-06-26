module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  ignorePatterns: ["dist", ".eslintrc.cjs", "vite.config.ts"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",

    "next/core-web-vitals",
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "prettier",
    // "plugin:@tanstack/eslint-plugin-query/recommended"
  ],
  rules: {
    "react-refresh/only-export-components": ["off", { allowConstantExport: true }],

    "import/extensions": "off",

    "class-methods-use-this": "off",
    // "@ts-expect-error": "off",

    // "@tanstack/query/exhaustive-deps": "error",
    // "@tanstack/query/prefer-query-object-syntax": "off",
    // "@tanstack/query/stable-query-client": "error",

    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-undef": "off",
    "@typescript-eslint/no-param-reassign": "off",
    "@typescript-eslint/no-underscore-dangle": "off",
    "@typescript-eslint/no-nested-ternary": "off",
    "@typescript-eslint/no-case-declarations": "off",
    "@typescript-eslint/no-throw-literal": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-types": "off",

    "no-undef": "off",
    "no-unused-vars": "off",
    "no-param-reassign": "off",
    "no-underscore-dangle": "off",
    "no-use-before-define": "off",
    "no-nested-ternary": "off",
    "no-case-declarations": "off",

    "jsx-a11y/heading-has-content": "off",

    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/no-unknown-property": "off",
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx", ".ts", ".tsx"] }],
    "react/jsx-props-no-spreading": "off",
    "react/require-default-props": "off",
    "react/function-component-definition": "off",
    "react/no-unstable-nested-components": "off",

    "react-hooks/exhaustive-deps": "off",

    "import/no-cycle": "off",
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": "off",
    // "import/extensions": [
    //   "error",
    //   "ignorePackages",
    //   {
    //     js: "never",
    //     jsx: "never",
    //     ts: "never",
    //     tsx: "never",
    //   },
    // ],
  },
  parserOptions: {
    parser: "@typescript-eslint/parser",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  plugins: ["react-refresh", "@tanstack/query"],
}
