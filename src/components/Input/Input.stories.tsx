// Button.stories.tsx
import { ComponentProps, useEffect, useRef } from "react";
import Input from "./Input";
import { Story } from "@storybook/react/types-6-0";
import { FormProvider, useForm } from "react-hook-form";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Input",
  component: Input,
  argTypes: {
    label: { type: "string", defaultValue: "Label" },
    name: { defaultValue: "input-test" },
    hasError: { type: "boolean" },
  },
};

const Template: Story<ComponentProps<typeof Input> & { hasError?: string }> = ({
  hasError,
  name,
  ...args
}) => {
  const form = useForm();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (hasError && !form.errors[name]) {
      form.setError(name, { message: "error message" });
      inputRef.current?.setCustomValidity("blep");
    }
  }, [hasError, form, name]);

  return (
    <FormProvider {...form}>
      <Input {...args} name={name} ref={inputRef} />
    </FormProvider>
  );
};

export const Default = Template.bind({});
export const WithError = Template.bind({});
WithError.args = {
  // @ts-ignore
  hasError: true,
};
