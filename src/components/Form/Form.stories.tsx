// Button.stories.tsx
import { ComponentProps } from "react";
import Form from "./Form";
import { Story } from "@storybook/react/types-6-0";
import { FormProvider, useForm } from "react-hook-form";
import FormGroup from "./FormGroup";
import Input from "./Input/Input";
import FormLabel from "./FormLabel";
import { Button } from "components";
import FormRow from "./FormRow";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Form",
  component: Form,
};

const schema = yup.object().shape({
  pek1: yup.string().required(),
  pek4: yup.string().required(),
});

const Template: Story<ComponentProps<typeof Form>> = (args) => {
  const form = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <FormProvider {...form}>
      <Form
        {...args}
        onSubmit={form.handleSubmit((data) => alert(JSON.stringify(data)))}
      >
        <FormRow>
          <FormGroup>
            <FormLabel htmlFor="pek1">Label</FormLabel>
            <Input type="text" id="pek1" {...form.register("pek1")} />
          </FormGroup>
          <FormGroup>
            <FormLabel>Label2</FormLabel>
            <Input type="text" name="pek2" />
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <Input type="text" name="pek3" />
          </FormGroup>
          <FormGroup>
            <Input type="text" {...form.register("pek4")} />
          </FormGroup>
          <FormGroup>
            <Input type="text" name="pek5" />
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <Input type="text" name="pek6" />
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <Button type="submit">Submit</Button>
          </FormGroup>
        </FormRow>
      </Form>
    </FormProvider>
  );
};

export const Default = Template.bind({});
