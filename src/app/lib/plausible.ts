import { usePlausible } from "next-plausible";

type PlausibleEvents = {
  "Contact Form Submitted": never;
  "Outbound: LinkedIn": never;
  "Outbound: Malt": never;
  "Outbound: GitHub": never;
  "Project Card Clicked": { project: string; link: string };
  "Language Switched": { lang: string };
  "Theme Toggled": { theme: string };
  "Book Discovery Call Clicked": { source: string };
};

export function usePlausibleEvents() {
  return usePlausible<PlausibleEvents>();
}
