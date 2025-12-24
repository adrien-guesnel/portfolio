export const SECTION_ROUTES = {
  home: "#home",
  skills: "#skills",
  testimonials: "#testimonials",
  projects: "#projects",
  articles: "#articles",
  contact: "#contact",
} as const;

export const SECTION_IDS = {
  home: "home",
  skills: "skills",
  testimonials: "testimonials",
  projects: "projects",
  articles: "articles",
  contact: "contact",
} as const;

export type SectionRouteKey = keyof typeof SECTION_ROUTES;
export type SectionRoute = (typeof SECTION_ROUTES)[SectionRouteKey];
