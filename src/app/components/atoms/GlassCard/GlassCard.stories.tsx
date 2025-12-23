import type { Meta, StoryObj } from "@storybook/nextjs";

import { GlassCard } from "./index";

const meta: Meta<typeof GlassCard> = {
  title: "atoms/GlassCard",
  component: GlassCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof GlassCard>;

export const Default: Story = {
  args: {
    className: "w-[360px]",
    children: (
      <div className="space-y-3 text-left">
        <p className="text-xs uppercase tracking-[0.25em] opacity-70">Glass</p>
        <h3 className="text-xl font-semibold">GlassCard</h3>
        <p className="text-sm opacity-80">Softer shadow in light theme, richer depth in dark.</p>
      </div>
    ),
  },
};
