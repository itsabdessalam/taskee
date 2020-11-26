module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended"
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    "react/prop-types": 0,
    "react/react-in-jsx-scope": 0,
    "no-unused-vars": 0
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};
