import type { Meta, StoryObj } from "@storybook/nextjs";

import { MediumArticleCard } from "./index";

const meta: Meta<typeof MediumArticleCard> = {
  title: "molecules/MediumArticleCard",
  component: MediumArticleCard,
};
export default meta;

type Story = StoryObj<typeof MediumArticleCard>;

const baseArgs = {
  title: "Microservices: When Monoliths Break",
  snippet:
    "Exploring the transition from monolithic architectures to microservices. Key challenges, patterns, and strategies for reliable migration.",
  url: "https://medium.com/",
  tag: "Architecture",
  readTime: "5 min read",
};

export const Default: Story = {
  args: baseArgs,
};
