import type { Meta, StoryObj } from "@storybook/react"

import Input from "./index"

const meta = {
  title: "Atoms/Input",
  component: Input,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "Label",
    name: "myInput",
    placeholder: "Placeholder",
    type: "text",
  },
}
