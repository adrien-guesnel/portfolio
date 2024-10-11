import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"
import { Meta, StoryObj } from "@storybook/react"

import Toggle from "./index"

const meta = {
  title: "Atoms/Toggle",
  component: Toggle,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: false,
    onChange: (value: boolean) => console.log(value),
  },
}

export const WithIcons = {
  args: {
    iconLeft: faSun,
    iconRight: faMoon,
  },
}
