import type { Meta, StoryObj } from "@storybook/react"

import { ThemeMode } from "@/src/app/lib/constants"

import Footer from "./index"

const meta = {
  title: "Components/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Footer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    themeMode: ThemeMode.Light,
  },
}
