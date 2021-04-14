/** @jsxImportSource @emotion/react */
import "twin.macro";
import { HTMLProps } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";

type InputProps = HTMLProps<HTMLInputElement> & { name: string } & {
  dropzone?: DropzoneOptions;
};

const FileInput = ({ dropzone, ...props }: InputProps) => {
  const { control, setValue } = useFormContext();
  const { getRootProps, getInputProps } = useDropzone({
    ...dropzone,
    onDrop: (accepted, rejected, event) => {
      setValue(props.name, props.multiple ? accepted : accepted[0]);
      dropzone?.onDrop?.(accepted, rejected, event);
    },
  });

  return (
    <Controller
      control={control}
      name={props.name}
      render={() => (
        <div tw="flex items-center flex-col border border-primary rounded-md pt-1 px-3  bg-purple-50">
          <label tw="self-start mb-1 text-primary text-sm">{props.label}</label>
          <div
            {...getRootProps()}
            tw="w-full cursor-pointer h-32 flex justify-center items-center focus:ring-0 focus:outline-none"
          >
            <p tw="text-primary">Drop your file(s) here</p>
            <input {...props} {...getInputProps()} />
          </div>
          <ErrorMessage name={props.name} />
        </div>
      )}
    />
  );
};

export default FileInput;
