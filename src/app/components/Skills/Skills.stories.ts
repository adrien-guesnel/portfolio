import type { Meta, StoryObj } from "@storybook/nextjs"

import { ThemeMode } from "@/src/app/lib/constants"

import Skills from "./index"

const meta = {
  title: "Components/Skills",
  component: Skills,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Skills>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    themeMode: ThemeMode.Light,
  },
}
