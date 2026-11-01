import type { Meta, StoryObj } from "@storybook/nextjs";
import { ArrowRight } from "iconoir-react";

import { Button } from "./index";

const meta: Meta<typeof Button> = {
  title: "atoms/Button",
  component: Button,
  args: {
    children: "Réserver un appel découverte",
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {};

export const Neutral: Story = {
  args: { variant: "neutral" },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "Voir les études de cas" },
};

export const Small: Story = {
  args: { size: "sm", children: "Réserver un appel" },
};

export const WithIcon: Story = {
  args: { icon: <ArrowRight className="size-4.5" aria-hidden /> },
};

export const Loading: Story = {
  args: { loading: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};
