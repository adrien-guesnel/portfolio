import type { Meta, StoryObj } from "@storybook/nextjs";

import Testimonials from "./index";

const meta = {
  title: "organisms/Testimonials",
  component: Testimonials,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Testimonials>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
