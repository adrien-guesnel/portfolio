import type { Meta, StoryObj } from "@storybook/react"

import { ThemeMode } from "@/app/lib/constants"

import Logo from "./index"

const meta = {
  title: "Components/Logo",
  component: Logo,
  tags: ["autodocs"],
} satisfies Meta<typeof Logo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    themeMode: ThemeMode.Light,
  },
}
