/** @jsxImportSource @emotion/react  */
import { HTMLProps } from "react";
import "twin.macro";

type FormProps = HTMLProps<HTMLFormElement>;

const Form = (props: FormProps) => <form {...props} />;

export default Form;
