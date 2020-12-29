import { Input } from "components";
import { FormProvider, useForm } from "react-hook-form";

function App() {
  const form = useForm();

  return (
    <FormProvider {...form}>
      <Input name="test" ref={form.register} label="pekpek" />
    </FormProvider>
  );
}

export default App;
