import { render } from "test-utils";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Input from "./Input";

describe("Input unit tests", () => {
  it("Applies focusing styles when input is focused", async () => {
    const Component = () => {
      return (
        <FormProvider {...useForm()}>
          <Input name="my-input" label="My input" />
        </FormProvider>
      );
    };
    const { asFragment } = render(<Component />);

    const firstRender = asFragment();
    expect(firstRender).toMatchSnapshot();
  });

  it("Applies the error styles", () => {
    const Component = () => {
      const form = useForm();

      useEffect(() => {
        form.setError("my-input", {
          type: "server",
          message: "Test message",
        });
      }, []);
      return (
        <FormProvider {...form}>
          <Input name="my-input" label="My input" />
        </FormProvider>
      );
    };

    const { getByTestId } = render(<Component />);

    expect(getByTestId("error-message-my-input")).toHaveTextContent(
      "Test message"
    );
  });
});
