import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import Script from "next/script";
import { getMessages } from "next-intl/server";

import "@/src/app/globals.css";

import NextIntlProvider from "@/src/app/lib/NextIntlProvider";
import { THEME_COLORS, THEME_INIT_SCRIPT } from "@/src/app/lib/theme";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "Adrien Guesnel · Tech Lead",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: THEME_COLORS.light },
    { media: "(prefers-color-scheme: dark)", color: THEME_COLORS.dark },
  ],
  initialScale: 1,
  width: "device-width",
};

type Params = Promise<{ locale: string }>;

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const { locale } = await params;
  const host = (await headers()).get("host") ?? "";
  const domain = host.split(":")[0];

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <GoogleTagManager gtmId="GTM-PNCB69TF" />

      <body className="font-sans" suppressHydrationWarning>
        <Script id="init-theme" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
        <Script
          defer
          data-domain={domain}
          src="https://analytics.aguesnel.fr/js/script.hash.outbound-links.pageview-props.tagged-events.js"
        />
        <Script id="plausible-init">{`window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}`}</Script>
        <NextIntlProvider
          locale={locale}
          messages={messages}
          timeZone="Europe/Berlin"
          now={new Date()}
        >
          {children}
        </NextIntlProvider>
      </body>
    </html>
  );
}
