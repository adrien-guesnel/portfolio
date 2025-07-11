import type { Meta, StoryObj } from "@storybook/react"

import NavigationBar from "./index"

const meta = {
  title: "Components/NavigationBar",
  component: NavigationBar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof NavigationBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onThemeChange: () => {},
    locale: "en",
  },
}
