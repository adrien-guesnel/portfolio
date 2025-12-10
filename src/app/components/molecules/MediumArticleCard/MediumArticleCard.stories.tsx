import type { Meta, StoryObj } from "@storybook/nextjs";

import BiomeArticleImg from "@public/img/articles/biome.webp";

import { MediumArticleCard } from "./index";

const meta: Meta<typeof MediumArticleCard> = {
  title: "molecules/MediumArticleCard",
  component: MediumArticleCard,
};
export default meta;

type Story = StoryObj<typeof MediumArticleCard>;

const baseArgs = {
  image: BiomeArticleImg,
  title: "How i dump eslint/prettier for biome, and you should do the same!",
  snippet:
    "For years, ESLint + Prettier was my default setup. Like everyone else, I copy‑pasted the same configs from project to project and didn’t really question it. Most of my work is in Next.js, and that stack “just worked”… until it didn’t.",
  url: "https://medium.com/",
};

export const Default: Story = {
  args: baseArgs,
};

export const CustomButton: Story = {
  args: {
    ...baseArgs,
    buttonLabel: "Open story",
  },
};
