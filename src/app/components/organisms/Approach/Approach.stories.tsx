import type { Meta, StoryObj } from "@storybook/nextjs";

import Approach from "./index";

const meta = {
  title: "organisms/Approach",
  component: Approach,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Approach>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
