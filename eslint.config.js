const coreWebVitals = require("eslint-config-next/core-web-vitals");

module.exports = [
  {
    ignores: [
      "**/.next/**",
      "**/out/**",
      "**/build/**",
      "**/dist/**",
      "**/.turbo/**",
      "**/node_modules/**",
    ],
  },
  ...coreWebVitals,
];
