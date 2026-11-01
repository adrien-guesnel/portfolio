import type { Meta, StoryObj } from "@storybook/nextjs";

import Expertise from "./index";

const meta = {
  title: "organisms/Expertise",
  component: Expertise,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Expertise>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
