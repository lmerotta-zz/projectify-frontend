import { render } from "@testing-library/react";
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
});
