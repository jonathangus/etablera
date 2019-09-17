module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    "eslint:recommended",
    "airbnb-base",
    "plugin:react/recommended",
    "prettier",
  ],
  plugins: ["react", "import"],
  globals: {
    graphql: false,
  },
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
  },
  rules: {
    "class-methods-use-this": 0,
    "no-unused-expressions": 0,
    "react/prop-types": 0,
    "react/display-name": 0,
    "import/no-named-as-default": 0,
    "import/no-named-as-default-member": 0,
    "import/prefer-default-export": 0,
    "no-underscore-dangle": 0,
    "import/order": 0,
    "arrow-body-style": 0,
    "no-unused-vars": 0,
  },
}
