import nextJs from "eslint-config-next";

const eslintConfig = [
  ...nextJs,
  {
    rules: {
      "react/display-name": "off",
    },
  },
];

export default eslintConfig;
