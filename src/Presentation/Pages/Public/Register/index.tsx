import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ReactToastifyUserFeedback } from "@Frameworks/Feedback/react-toastfy";

import UserContext from "@Contexts/User";

import FormBuilder from "@Components/FormBuilder";

import CoverImage from "@Assets/Cover.png";
import LogoImage from "@Assets/Logo.png";

import { createAccount } from "@Service/api";

import {
  PageHolder,
  RegisterPageDisclaimerHolder,
  ImageBackground,
  ImageCover,
  DisclaimerHolder,
  DisclaimerTitle,
  DisclaimerContent,
  RegisterPageFormHolder,
  Logo,
  GoToRegister,
} from "./styles";

const RegisterPage = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const toaster = new ReactToastifyUserFeedback();

  const formInputs = [
    {
      name: "name",
      label: "Nome",
      pattern: /^[a-z ,.'-]+$/i,
      errorMessage: "Insira seu nome e sobrenome",
      required: true,
      disabled: false,
      nested: false,
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      pattern: /[a-zA-Z0-9]+@+[a-zA-Z0-9]+\.+[a-zA-Z0-9]/,
      errorMessage: "Insira um email válido",
      required: true,
      disabled: false,
      nested: false,
      type: "text",
    },
    {
      name: "password",
      label: "Senha",
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
      errorMessage:
        "Sua senha deve conter oito caracteres, uma letra maiúscula, uma letra minúscula e um dígito",
      required: true,
      disabled: false,
      nested: false,
      type: "password",
    },
    {
      name: "repeatPassword",
      label: "Repetir Senha",
      validatePassword: true,
      errorMessage: "Senhas não conferem",
      required: true,
      disabled: false,
      nested: false,

      type: "password",
    },
  ];

  const onSubmitForm = (data: {
    name: string;
    email: string;
    password: string;
  }) =>
    createAccount(data)
      .then(({ data }) => {
        toaster.success("Conta criada com sucesso");
        userContext.email = data.content.email;
        navigate("/");
      })
      .catch(({ response }) => toaster.error(response.data.message));

  return (
    <PageHolder>
      <RegisterPageDisclaimerHolder>
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
      </RegisterPageDisclaimerHolder>
      <RegisterPageFormHolder>
        <Logo src={LogoImage} />
        <FormBuilder
          formData={{
            inputs: formInputs,
            submitButton: {
              value: "REGISTRAR",
              height: "70px",
              width: "100%",
              fontSize: "25px",
            },
            onSubmit: onSubmitForm,
          }}
        />{" "}
        <GoToRegister to="/">Logar</GoToRegister>
      </RegisterPageFormHolder>
    </PageHolder>
  );
};

export default RegisterPage;
