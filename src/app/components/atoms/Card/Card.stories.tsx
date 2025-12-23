import type { Meta, StoryObj } from "@storybook/nextjs";

import Card from "./index";

const meta: Meta<typeof Card> = {
  title: "atoms/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    className: "w-[360px]",
    children: (
      <div className="space-y-3 text-left">
        <h3 className="text-xl font-semibold">Card</h3>
        <p className="text-sm opacity-80">Softer shadow in light theme, richer depth in dark.</p>
      </div>
    ),
  },
};
