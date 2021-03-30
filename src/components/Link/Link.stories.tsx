// Button.stories.tsx
import { ComponentProps } from "react";
import Link from "./Link";
import { Story } from "@storybook/react/types-6-0";
import { MemoryRouter } from "react-router";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Link",
  component: Link,
};

const Template: Story<ComponentProps<typeof Link>> = (args) => (
  <MemoryRouter>
    <Link {...args} to="#">
      My link
    </Link>
  </MemoryRouter>
);

export const Default = Template.bind({});
