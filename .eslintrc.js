module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "next/core-web-vitals", // nextjs 기본 eslint 설정
    "plugin:react/recommended",
    "plugin:react/jsx-runtime", // import React from 'react' 제거
    "standard-with-typescript", // eslint에 typescript 연동
    "prettier", // eslint에 prettier 연동
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/no-unescaped-entities": "off",
    "@typescript-eslint/unbound-method": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/no-dynamic-delete": "off",
    "react/display-name": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/lines-between-class-members": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-throw-literal": "off",
  },
};
