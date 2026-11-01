import type { Meta, StoryObj } from "@storybook/nextjs";

import Articles from "./index";

const meta = {
  title: "organisms/Articles",
  component: Articles,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Articles>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
