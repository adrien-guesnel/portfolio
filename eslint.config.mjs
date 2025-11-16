import { FlatCompat } from "@eslint/eslintrc"
import js from "@eslint/js"
import stylisticJs from "@stylistic/eslint-plugin-js"
import storybook from "eslint-plugin-storybook"
import unusedImports from "eslint-plugin-unused-imports"
import { defineConfig, globalIgnores } from "eslint/config"

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default defineConfig([
  ...storybook.configs["flat/recommended"],
  globalIgnores([
    "app/_graphql/__generated__/*",
    "app/components/Icon/iconList.ts",
    "app/components/Illustration/illustrationList.ts",
    "app/components/Logo/logoList.ts",
    "app/components/LottieAnimation/lottieAnimationList.ts",
    "app/components/TutorialCard/tutorialCard.ts",
    "app/components/Flight/FlightTag/flightTags.ts",
    "app/lib/constants.ts",
    "app/lib/errors.ts",
    "app/components/StepperDotComponent/index.tsx",
    "app/components/TravelStepCard/bookingStatus.ts",
    "app/components/TravelStepCard/travelSteps.ts",
    "app/components/Steppers/StepperDot/stepperDot.ts",
    "app/_graphql/__generated__/",
  ]),
  {
    extends: [
      ...compat.config({
        extends: [
          "eslint:recommended",
          "next",
          "next/core-web-vitals",
          "next/typescript",
        ],
      }),
    ],
    plugins: {
      "@stylistic/js": stylisticJs,
      "unused-imports": unusedImports,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
      "react/react-in-jsx-scope": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "@stylistic/js/padding-line-between-statements": [
        "error",
        {
          blankLine: "always",
          prev: "*",
          next: "return",
        },
        {
          blankLine: "always",
          prev: "*",
          next: "function",
        },
        {
          blankLine: "always",
          prev: "*",
          next: "if",
        },
        {
          blankLine: "always",
          prev: "*",
          next: "export",
        },
      ],
    },
  },
])
