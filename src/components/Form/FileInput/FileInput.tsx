/** @jsxImportSource @emotion/react */
import "twin.macro";
import { HTMLProps } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useTranslation } from "react-i18next";

type InputProps = Omit<HTMLProps<HTMLInputElement>, "css"> & {
  name: string;
} & {
  dropzone?: DropzoneOptions;
};

const FileInput = ({ dropzone, ...props }: InputProps) => {
  const { control, setValue } = useFormContext();
  const { getRootProps, getInputProps } = useDropzone({
    ...dropzone,
    onDrop: (accepted, rejected, event) => {
      /* istanbul ignore next */

      setValue(props.name, props.multiple ? accepted : accepted[0], {
        shouldValidate: true,
        shouldDirty: true,
      });
      dropzone?.onDrop?.(accepted, rejected, event);
    },
  });
  const { t } = useTranslation();

  return (
    <Controller
      control={control}
      name={props.name}
      render={() => (
        <div tw="flex items-center flex-col border border-primary rounded-md pt-1 px-3  bg-purple-50">
          <div
            {...getRootProps()}
            data-testid={`file-input-${props.name}`}
            tw="w-full cursor-pointer h-32 flex justify-center items-center focus:ring-0 focus:outline-none"
          >
            <p tw="text-primary">
              {t("components.form.fileinput.help_message")}
            </p>
            <input {...props} {...getInputProps()} />
          </div>
          <ErrorMessage name={props.name} />
        </div>
      )}
    />
  );
};

export default FileInput;
