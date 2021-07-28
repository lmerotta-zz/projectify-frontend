/** @jsxImportSource @emotion/react  */
import { HTMLProps } from "react";
import "twin.macro";

type FormProps = Omit<HTMLProps<HTMLFormElement>, "css">;

const Form = (props: FormProps) => <form {...props} />;

export default Form;
