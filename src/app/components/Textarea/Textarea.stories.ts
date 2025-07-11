import type { Meta, StoryObj } from "@storybook/nextjs"

import Textarea from "./index"

const meta = {
  title: "Atoms/Textarea",
  component: Textarea,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "Label",
    name: "myTextarea",
    placeholder: "Placeholder",
    rows: 5,
  },
}
