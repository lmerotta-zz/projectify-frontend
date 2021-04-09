// Button.stories.tsx
import { ComponentProps } from "react";
import Typography from "./Typography";
import { Story } from "@storybook/react/types-6-0";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Typography/Base",
  component: Typography,
  argTypes: {
    color: {
      control: {
        type: "radio",
        options: ["default", "dark", "light", "primary", "secondary", "danger"],
      },
      defaultValue: "default",
    },
  },
};

type StoryProps = Omit<ComponentProps<typeof Typography>, "as">;

const Template: Story<StoryProps> = (args) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <Typography variant="h1" {...args}>
      The quick brown fox jumps over the lazy dog
    </Typography>
    <Typography variant="h2" {...args}>
      The quick brown fox jumps over the lazy dog
    </Typography>
    <Typography variant="h3" {...args}>
      The quick brown fox jumps over the lazy dog
    </Typography>
    <Typography variant="h4" {...args}>
      The quick brown fox jumps over the lazy dog
    </Typography>
    <Typography variant="h5" {...args}>
      The quick brown fox jumps over the lazy dog
    </Typography>
    <Typography variant="h6" {...args}>
      The quick brown fox jumps over the lazy dog
    </Typography>
    <Typography variant="body" {...args}>
      The quick brown fox jumps over the lazy dog
    </Typography>
    <Typography variant="sm" {...args}>
      The quick brown fox jumps over the lazy dog
    </Typography>
    <Typography variant="xs" {...args}>
      The quick brown fox jumps over the lazy dog
    </Typography>
  </div>
);

export const Default = Template.bind({});
