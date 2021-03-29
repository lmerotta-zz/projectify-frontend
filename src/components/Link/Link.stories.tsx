// Button.stories.tsx
import { ComponentProps } from "react";
import Link from "./Link";
import { Story } from "@storybook/react/types-6-0";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Link",
  component: Link,
};

const Template: Story<ComponentProps<typeof Link>> = (args) => (
  <Link {...args} href="#">
    My link
  </Link>
);

export const Default = Template.bind({});
