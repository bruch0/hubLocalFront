import FormBuilder from "@Components/FormBuilder";

import CoverImage from "@Assets/Cover.png";
import LogoImage from "@Assets/Logo.png";

import {
  PageHolder,
  LoginPageDisclaimerHolder,
  ImageBackground,
  ImageCover,
  DisclaimerHolder,
  DisclaimerTitle,
  DisclaimerContent,
  LoginPageFormHolder,
  Logo,
} from "./styles";

const LoginPage = () => {
  const formInputs = [
    {
      name: "email",
      label: "Email",
      patern: /[a-zA-Z0-9]+@+[a-zA-Z0-9]+\.+[a-zA-Z0-9]/,
      errorMessage: "Insira um email válido",
      required: true,
      disabled: false,
      type: "text",
    },
    {
      name: "password",
      label: "Senha",
      patern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
      errorMessage:
        "Sua senha deve conter oito caracteres, uma letra maiúscula, uma letra minúscula e um dígito",
      required: true,
      disabled: false,
      type: "password",
    },
  ];

  return (
    <PageHolder>
      <LoginPageDisclaimerHolder>
        <ImageBackground>
          <ImageCover src={CoverImage} />
        </ImageBackground>
        <DisclaimerHolder>
          <DisclaimerTitle>
            Junte-se a vários clientes satisfeitos.
          </DisclaimerTitle>
          <DisclaimerContent>
            Cliente HubLocal ganha mais relevância, autoridade e visibilidade.
            Mais de 7.000 marcas confiam na nossa plataforma. Seja uma delas!
          </DisclaimerContent>
        </DisclaimerHolder>
      </LoginPageDisclaimerHolder>
      <LoginPageFormHolder>
        <Logo src={LogoImage} />
        <FormBuilder
          formData={{
            inputs: formInputs,
            submitButton: "Logar",
            onSubmit: (d: any) => console.log(d),
          }}
        />{" "}
      </LoginPageFormHolder>
    </PageHolder>
  );
};

export default LoginPage;
