"use client";

import { type AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import type { ReactNode } from "react";

type Props = {
  messages: AbstractIntlMessages;
  locale: string;
  children: ReactNode;
  now: Date;
  timeZone: string;
};

export default function NextIntlProvider({ messages, locale, children, now, timeZone }: Props) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages} now={now} timeZone={timeZone}>
      {children}
    </NextIntlClientProvider>
  );
}
