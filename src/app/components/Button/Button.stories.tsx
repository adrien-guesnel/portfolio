// @ts-nocheck
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Meta, StoryObj } from "@storybook/nextjs";

import { Button } from "./index";

const meta: Meta<typeof Button> = {
  title: "atoms/Button",
  component: Button,
};
export default meta;

type Story = StoryObj<typeof Button>;
const Template = (args: React.ComponentProps<typeof Button>) => (
  <Button {...args}> My button</Button>
);

export const AllStates: Story = {
  render: (args) => (
    <div className="flex flex-row gap-3">
      <Disabled {...args} {...Disabled.args} />
      <WithIcon {...args} {...WithIcon.args} />
      <Loading {...args} {...Loading.args} />
      <Styled {...args} />
    </div>
  ),
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
Disabled.parameters = {
  chromatic: { disableSnapshot: true },
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  icon: <FontAwesomeIcon icon={faStar} />,
};
WithIcon.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};
Loading.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Styled = (args) => (
  <div className="flex flex-row gap-3">
    <Button className="button-contained" {...args}>
      My button
    </Button>
    <Button className="button-outlined" {...args}>
      My button
    </Button>
  </div>
);
Styled.parameters = {
  chromatic: { disableSnapshot: true },
};
