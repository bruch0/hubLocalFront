import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import {
  Form,
  Label,
  Input,
  Error,
  Submit,
  InputHolder,
  ModalBottom,
  InputContainer,
  MaskedInput,
} from "./styles";

interface FormData {
  inputs: Array<{
    name: string;
    label: string;
    defaultValue?: string;
    pattern?: RegExp;
    errorMessage: string;
    required: boolean;
    disabled: boolean;
    type: string;
    nested: boolean;
    validatePassword?: boolean;
    mask?: string;
  }>;
  message?: string;
  submitButton: {
    value: string;
    height: string;
    width: string;
    fontSize: string;
    red?: boolean;
  };
  onSubmit: Function;
  modalBottom?: boolean;
}

export default function App({ formData }: { formData: FormData }) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const { inputs, submitButton, modalBottom, message } = formData;

  const onSubmit = (data: any): void => formData.onSubmit(data);
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputContainer modal={!!modalBottom}>
        {inputs.length > 0
          ? inputs.map((userInput) => (
              <InputHolder nested={userInput.nested}>
                <Label htmlFor={userInput.name}>{userInput.label}</Label>
                {userInput.mask ? (
                  <Controller
                    name={userInput.name}
                    control={control}
                    rules={{
                      required: userInput.required,
                      pattern: userInput.pattern,
                    }}
                    render={({ field }) => {
                      // eslint-disable-next-line react-hooks/rules-of-hooks
                      useEffect(() => {
                        setValue(userInput.name, userInput.defaultValue);
                      }, []);

                      return (
                        <MaskedInput
                          mask="99.999.999/9999-99"
                          {...field}
                          ref={null}
                          defaultValue={userInput.defaultValue}
                          disabled={userInput.disabled}
                        />
                      );
                    }}
                  />
                ) : (
                  <Input
                    {...register(userInput.name, {
                      required: userInput.required,
                      pattern: userInput.pattern,
                      value: userInput.defaultValue,
                      validate: userInput.validatePassword
                        ? (value: string) => {
                            if (watch("password") !== value) {
                              return "Your passwords do no match";
                            }
                          }
                        : undefined,
                    })}
                    type={userInput.type}
                  />
                )}
                {errors[userInput.name] && (
                  <Error>{userInput.errorMessage}</Error>
                )}
              </InputHolder>
            ))
          : message}
      </InputContainer>

      {modalBottom ? (
        <ModalBottom>
          <Submit
            type="submit"
            disabled={isSubmitting}
            height={submitButton.height}
            width={submitButton.width}
            fontSize={submitButton.fontSize}
            red={!!submitButton.red}
          >
            {isSubmitting ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    dur="0.75s"
                    values="0 12 12;360 12 12"
                    repeatCount="indefinite"
                  />
                </path>
              </svg>
            ) : (
              submitButton.value
            )}
          </Submit>
        </ModalBottom>
      ) : (
        <Submit
          type="submit"
          disabled={isSubmitting}
          height={submitButton.height}
          width={submitButton.width}
          fontSize={submitButton.fontSize}
          red={!!submitButton.red}
        >
          {isSubmitting ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  dur="0.75s"
                  values="0 12 12;360 12 12"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          ) : (
            submitButton.value
          )}
        </Submit>
      )}
    </Form>
  );
}
