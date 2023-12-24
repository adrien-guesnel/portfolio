import type { Preview } from "@storybook/react"
import { NextIntlClientProvider } from "next-intl"
import React from "react"

// @ts-ignore
import NextIntlProvider from "@/app/lib/NextIntlProvider"

import "../app/globals.css"
// @ts-ignore
import messages from "../messages/en/components.json"

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <NextIntlProvider locale="en" messages={messages}>
        <Story />
      </NextIntlProvider>
    ),
  ],
}

export default preview
