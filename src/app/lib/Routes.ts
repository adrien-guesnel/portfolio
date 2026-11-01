export const SECTION_IDS = {
  main: "main-content",
  top: "top",
  approach: "approach",
  caseStudies: "case-studies",
  experience: "experience",
  expertise: "expertise",
  testimonials: "testimonials",
  articles: "articles",
  contact: "contact",
} as const;

export const SECTION_ROUTES = {
  main: `#${SECTION_IDS.main}`,
  approach: `#${SECTION_IDS.approach}`,
  caseStudies: `#${SECTION_IDS.caseStudies}`,
  experience: `#${SECTION_IDS.experience}`,
  expertise: `#${SECTION_IDS.expertise}`,
  contact: `#${SECTION_IDS.contact}`,
} as const;

export type SectionRouteKey = keyof typeof SECTION_ROUTES;
export type SectionRoute = (typeof SECTION_ROUTES)[SectionRouteKey];
