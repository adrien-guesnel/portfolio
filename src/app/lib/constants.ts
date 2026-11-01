export const HIRE_ME_URL = "https://www.malt.fr/profile/adrienguesnel";
export const LIKEDIN_URL = "https://www.linkedin.com/in/adrien-guesnel/";
export const MEDIUM_URL = "https://medium.com/@adrienguesnel";
export const GITHUB_URL = "https://github.com/adrien-guesnel";
export const BOOKING_DISCOVERY_CALL_URL = "https://cal.com/aguesnel/discovery-call-freelance";

export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: LIKEDIN_URL, event: "Outbound: LinkedIn" },
  { label: "Malt", href: HIRE_ME_URL, event: "Outbound: Malt" },
  { label: "GitHub", href: GITHUB_URL, event: "Outbound: GitHub" },
  { label: "Medium", href: MEDIUM_URL, event: null },
] as const;
