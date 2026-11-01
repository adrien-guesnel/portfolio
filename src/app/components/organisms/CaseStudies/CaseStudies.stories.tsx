import type { Meta, StoryObj } from "@storybook/nextjs";

import CaseStudies from "./index";

const meta = {
  title: "organisms/CaseStudies",
  component: CaseStudies,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CaseStudies>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
