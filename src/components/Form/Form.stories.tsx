// Button.stories.tsx
import { ComponentProps } from "react";
import Form from "./Form";
import { Story } from "@storybook/react/types-6-0";
import { FormProvider, useForm } from "react-hook-form";
import FormGroup from "./FormGroup";
import Input from "./Input/Input";
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
            <Input type="text" name="pek1" label="pekpek" ref={form.register} />
          </FormGroup>
          <FormGroup>
            <Input type="text" name="pek2" label="pekpek" />
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <Input type="text" name="pek3" label="pekpek" />
          </FormGroup>
          <FormGroup>
            <Input type="text" name="pek4" label="pekpek" />
          </FormGroup>
          <FormGroup>
            <Input type="text" name="pek5" label="pekpek" />
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <Input type="text" name="pek6" label="pekpek" />
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
