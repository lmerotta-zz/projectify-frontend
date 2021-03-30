// Button.stories.tsx
import { ComponentProps } from "react";
import Button from "./Button";
import { Story } from "@storybook/react/types-6-0";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Button",
  component: Button,
  argTypes: {
    disabled: { control: { type: "boolean" } },
  },
};

const Template: Story<ComponentProps<typeof Button>> = (args) => (
  <Button {...args}>My Button</Button>
);

export const Default = Template.bind({});
