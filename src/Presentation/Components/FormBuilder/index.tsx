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
    formState: { errors },
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

      <Submit type="submit" value={formData.submitButton} />
    </Form>
  );
}
