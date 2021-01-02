import { forwardRef, HTMLProps, ReactNode } from "react";
import tw, { styled } from "twin.macro";
import { AnimateSharedLayout, motion } from "framer-motion";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";

const Wrapper = motion.custom(tw.div`relative outline-none`);

const labelFilledStyles = tw`text-primary top-0 translate-y-0.5 text-xs`;

const Label = styled.label`
  ${tw`absolute top-1/2 transform -translate-y-1/2 left-3 text-default cursor-text transition-all pointer-events-none`}
`;

const InputWrapper = motion.custom(tw.div`w-full relative`);
const StyledInput = styled.input`
  ${tw`w-full pt-4 pb-2 pl-3 pr-3 border rounded border-gray-400 appearance-none outline-none transition-colors focus:border-primary`}
  &:focus {
    + .label {
      ${labelFilledStyles}
    }
  }

  :not(:placeholder-shown) {
    ${tw`border-primary`}
    + .label {
      ${labelFilledStyles}
    }
  }

  &:invalid {
    ${tw`border-red-600`}
    + .label {
      ${tw`text-red-600`}
    }
  }
`;

type InputProps = Omit<HTMLProps<HTMLInputElement>, "as" | "name"> & {
  label: ReactNode;
  name: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, name, ...rest }, ref) => (
    <AnimateSharedLayout>
      <Wrapper layout>
        <InputWrapper layout>
          <StyledInput
            ref={ref}
            {...rest}
            name={name}
            placeholder="&nbsp;"
            data-testid={`input-${name}`}
          />
          {label && (
            <Label className="label" data-testid={`label-${name}`}>
              {label}
            </Label>
          )}
        </InputWrapper>
        <ErrorMessage name={name} />
      </Wrapper>
    </AnimateSharedLayout>
  )
);

export default Input;
