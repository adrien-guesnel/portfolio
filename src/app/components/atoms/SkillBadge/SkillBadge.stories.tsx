import type { Meta, StoryObj } from "@storybook/nextjs";

import SkillBadge from "./index";

const meta = {
  title: "Components/SkillBadge",
  component: SkillBadge,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SkillBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    skill: "JavaScript",
  },
};
