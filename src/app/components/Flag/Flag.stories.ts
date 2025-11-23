import type { Meta, StoryObj } from "@storybook/nextjs";

import Flag, { COUNTRIES } from "./index";

const meta = {
  title: "Components/Flag",
  component: Flag,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Flag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    countryCode: COUNTRIES.France,
  },
};
