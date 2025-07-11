import type { Meta, StoryObj } from "@storybook/nextjs"

import Hero from "./index"

const meta = {
  title: "Components/Hero",
  component: Hero,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Hero>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
