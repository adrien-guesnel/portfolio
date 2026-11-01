import type { Meta, StoryObj } from "@storybook/nextjs";

import { MediumArticleCard } from "./index";

const meta: Meta<typeof MediumArticleCard> = {
  title: "molecules/MediumArticleCard",
  component: MediumArticleCard,
};
export default meta;

type Story = StoryObj<typeof MediumArticleCard>;

export const Default: Story = {
  args: {
    title: "Deploy your first app on Kubernetes with OpenTofu",
    url: "https://medium.com/@adrienguesnel",
    tag: "DevOps",
    readTime: "4 min",
    readLabel: "Read",
  },
};
