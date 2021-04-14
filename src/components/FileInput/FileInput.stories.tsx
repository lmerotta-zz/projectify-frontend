import { ComponentProps, useEffect, useState } from "react";
import FileInput from "./FileInput";
import { Story } from "@storybook/react/types-6-0";
import { FormProvider, useForm } from "react-hook-form";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "FileInput",
  component: FileInput,
};

const Template: Story<ComponentProps<typeof FileInput>> = ({ ...args }) => {
  const form = useForm();
  const [numberOfFiles, setNumberOfFiles] = useState(0);

  useEffect(() => {
    form.setError("file-input", {
      type: "server",
      message: "Error message",
    });
  }, []);

  return (
    <FormProvider {...form}>
      <FileInput
        {...args}
        name="file-input"
        dropzone={{
          onDrop: (acceptedFiles) => {
            setNumberOfFiles(acceptedFiles.length);
          },
        }}
      />
      <p>Currently {numberOfFiles} selected</p>
    </FormProvider>
  );
};

export const Default = Template.bind({});
