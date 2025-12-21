// @ts-nocheck

import type { Meta, StoryObj } from "@storybook/nextjs";

import { Articles } from "./index";

const meta: Meta<typeof Articles> = {
  title: "organisms/Articles",
  component: Articles,
};
export default meta;

type Story = StoryObj<typeof Articles>;

const sampleArticles = [
  {
    title: "How I swapped ESLint/Prettier for Biome",
    snippet:
      "ESLint and Prettier felt like the default, but Biome brought everything into a single, faster toolchain. Here is what the migration looked like.",
    url: "https://medium.com/",
    readTime: "3 min",
    tag: "Tooling",
  },
  {
    title: "Techniques for resilient React layouts",
    snippet:
      "Sharing the layout heuristics I rely on so that cards, grids, and nav bars stay consistent when the data internet throws curveballs.",
    url: "https://medium.com/",
    readTime: "4 min",
    tag: "Frontend",
    tagColor: "secondary",
  },
];

export const Default: Story = {
  args: {
    title: "All my Medium notes",
    description:
      "I write about rebuilding frontend fundamentals, deploying blazing-fast apps, and the lessons I pick up along the way. Every story is practical, a snapshot from a real project.",
    articles: sampleArticles,
  },
};
