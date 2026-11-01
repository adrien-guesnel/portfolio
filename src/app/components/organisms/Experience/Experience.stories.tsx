import type { Meta, StoryObj } from "@storybook/nextjs";

import Experience from "./index";

const meta = {
  title: "organisms/Experience",
  component: Experience,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Experience>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
