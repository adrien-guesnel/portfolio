import type { Preview } from "@storybook/react";

// @ts-expect-error avoid type error due to importing json files
import NextIntlProvider from "@/src/app/lib/NextIntlProvider";

import messagesComponentsEn from "../messages/en/components.json";
import messagesPagesEn from "../messages/en/pages.json";
import messagesComponentsFr from "../messages/fr/components.json";
import messagesPagesFr from "../messages/fr/pages.json";
import "../src/app/globals.css";

const preview: Preview = {
  tags: ["autodocs"],
  globalTypes: {
    locale: {
      name: "Locale",
      description: "Internationalization locale",
      toolbar: {
        icon: "globe",
        items: [
          { value: "en", title: "English" },
          { value: "fr", title: "Français" },
        ],
        showName: true,
      },
    },
  },
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story, context) => {
      const locale = context.globals.locale || "en";
      console.log("locale", locale);

      let messages = { ...messagesComponentsEn, ...messagesPagesEn };

      if (locale === "fr") {
        messages = { ...messagesComponentsFr, ...messagesPagesFr };
      }

      return (
        <NextIntlProvider locale={locale} messages={messages}>
          <Story />
        </NextIntlProvider>
      );
    },
  ],
};

export default preview;
