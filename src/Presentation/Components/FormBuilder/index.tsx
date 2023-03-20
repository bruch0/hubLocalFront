import { useForm } from "react-hook-form";

import { Form, Label, Input, Error, Submit } from "./styles";

interface FormData {
  inputs: Array<{
    name: string;
    label: string;
    defaultValue?: string;
    patern?: RegExp;
    errorMessage: string;
    required: boolean;
    disabled: boolean;
    type: string;
    validatePassword?: boolean;
  }>;
  submitButton: string;
  onSubmit: Function;
}

export default function App({ formData }: { formData: FormData }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data: any): void => formData.onSubmit(data);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {formData.inputs.map((userInput) => (
        <>
          <Label htmlFor={userInput.name}>{userInput.label}</Label>
          <Input
            {...register(userInput.name, {
              required: userInput.required,
              pattern: userInput.patern,
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
          {errors[userInput.name] && <Error>{userInput.errorMessage}</Error>}
        </>
      ))}

      <Submit type="submit" disabled={isSubmitting}>
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
          formData.submitButton
        )}
      </Submit>
    </Form>
  );
}
