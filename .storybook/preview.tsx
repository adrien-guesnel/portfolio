import type { Preview } from "@storybook/react";
import { type ReactNode, useEffect } from "react";

// @ts-expect-error avoid type error due to importing json files
import NextIntlProvider from "@/src/app/lib/NextIntlProvider";

import messagesComponentsEn from "../messages/en/components.json";
import messagesPagesEn from "../messages/en/pages.json";
import messagesComponentsFr from "../messages/fr/components.json";
import messagesPagesFr from "../messages/fr/pages.json";
import "../src/app/globals.css";

const ThemeSetter = ({ theme, children }: { theme: string; children: ReactNode }) => {
  useEffect(() => {
    const documentElement = document.documentElement;
    const previousTheme = documentElement.getAttribute("data-theme");
    documentElement.setAttribute("data-theme", theme);

    return () => {
      if (previousTheme) {
        documentElement.setAttribute("data-theme", previousTheme);
      } else {
        documentElement.removeAttribute("data-theme");
      }
    };
  }, [theme]);

  return <>{children}</>;
};

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
    theme: {
      name: "Theme",
      description: "Toggle daisyUI theme",
      toolbar: {
        icon: "contrast",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
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
      const theme = context.globals.theme || "light";

      const messages =
        locale === "fr"
          ? { ...messagesComponentsFr, ...messagesPagesFr }
          : { ...messagesComponentsEn, ...messagesPagesEn };

      return (
        <ThemeSetter theme={theme}>
          <NextIntlProvider locale={locale} messages={messages}>
            <Story />
          </NextIntlProvider>
        </ThemeSetter>
      );
    },
  ],
};

export default preview;
