// Button.stories.tsx
import { ComponentProps } from "react";
import Title from "./Title";
import { Story } from "@storybook/react/types-6-0";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Typography/Title",
  component: Title,
};

const Template: Story<ComponentProps<typeof Title>> = () => (
  <Title>Login</Title>
);

export const Default = Template.bind({});
