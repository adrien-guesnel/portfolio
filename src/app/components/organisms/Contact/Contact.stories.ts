import type { Meta, StoryObj } from "@storybook/nextjs";

import Contact from "./index";

const meta = {
  title: "Components/Contact",
  component: Contact,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Contact>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
