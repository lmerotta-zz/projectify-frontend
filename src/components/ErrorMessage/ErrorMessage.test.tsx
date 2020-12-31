import { render } from "@testing-library/react";
import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

describe("ErrorMessage unit tests", () => {
  it("Displays the error message", async () => {
    const Component = () => {
      const methods = useForm();

      useEffect(() => {
        methods.setError("my-input", { message: "error-message" });
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      return (
        <FormProvider {...methods}>
          <ErrorMessage name="my-input" />
        </FormProvider>
      );
    };
    const { asFragment } = render(<Component />);

    expect(asFragment()).toMatchSnapshot();
  });
});
