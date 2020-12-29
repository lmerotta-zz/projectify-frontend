import {
  forwardRef,
  HTMLProps,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import tw, { styled } from "twin.macro";
import composeRefs from "@seznam/compose-react-refs";
import { AnimateSharedLayout, motion } from "framer-motion";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";

const Wrapper = motion.custom(tw.div`relative outline-none`);

const labelFilledStyles = tw`text-purple-600 top-0 translate-y-0.5 text-xs`;
const inputFilledStyles = tw`border-purple-600`;

const Label = styled.label<{ filled: boolean }>`
  ${tw`absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400 cursor-text transition-all pointer-events-none`}
  ${({ filled }) => filled && labelFilledStyles}
`;

const InputWrapper = motion.custom(tw.div`w-full relative`);
const StyledInput = styled.input<{ filled: boolean }>`
  ${tw`w-full pt-4 pb-2 pl-3 pr-3 border rounded border-gray-400 appearance-none outline-none transition-colors focus:border-purple-600`}
  &:focus {
    + .label {
      ${labelFilledStyles}
    }
  }
  ${({ filled }) => filled && inputFilledStyles}

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
  ({ label, name, ...rest }, ref) => {
    const [filled, setFilled] = useState(false);
    const innerRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      const element = innerRef.current;
      const onInput = () => {
        setFilled(!!element?.value);
      };
      element?.addEventListener("input", onInput);

      return () => {
        element?.removeEventListener("input", onInput);
      };
    });

    return (
      <AnimateSharedLayout>
        <Wrapper layout>
          <InputWrapper layout>
            <StyledInput
              ref={composeRefs(innerRef, ref)}
              {...rest}
              name={name}
              filled={filled}
            />
            {label && (
              <Label className="label" filled={filled}>
                {label}
              </Label>
            )}
          </InputWrapper>
          <ErrorMessage name={name} />
        </Wrapper>
      </AnimateSharedLayout>
    );
  }
);

export default Input;
