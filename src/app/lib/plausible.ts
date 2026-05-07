type PlausibleEventName =
  | "Contact Form Submitted"
  | "Outbound: LinkedIn"
  | "Outbound: Malt"
  | "Outbound: GitHub"
  | "Project Card Clicked"
  | "Language Switched"
  | "Theme Toggled"
  | "Book Discovery Call Clicked";

type PlausibleProps = Record<string, string>;

export function trackEvent(name: PlausibleEventName, props?: PlausibleProps): void {
  window.plausible?.(name, { props });
}

export function trackOutbound(destination: "LinkedIn" | "Malt" | "GitHub"): void {
  trackEvent(`Outbound: ${destination}`);
}
