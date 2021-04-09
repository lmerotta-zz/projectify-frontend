// Button.stories.tsx
import { ComponentProps } from "react";
import SubTitle from "./SubTitle";
import { Story } from "@storybook/react/types-6-0";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Typography/SubTitle",
  component: SubTitle,
};

const Template: Story<ComponentProps<typeof SubTitle>> = () => (
  <SubTitle>Sub-title</SubTitle>
);

export const Default = Template.bind({});
