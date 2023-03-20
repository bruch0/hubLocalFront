import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ReactToastifyUserFeedback } from "@Frameworks/Feedback/react-toastfy";
import { JsCookieManager } from "@Frameworks/Cookie/js-cookie";

import UserContext from "@Contexts/User";

import FormBuilder from "@Components/FormBuilder";

import { login } from "@Service/api";

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
  GoToRegister,
} from "./styles";

const LoginPage = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const toaster = new ReactToastifyUserFeedback();
  const cookieManager = new JsCookieManager();

  useEffect(() => {
    if (userContext.token) navigate("/companies");
  }, [userContext, navigate]);

  const formInputs = [
    {
      name: "email",
      label: "Email",
      defaultValue: userContext.email,
      patern: /[a-zA-Z0-9]+@+[a-zA-Z0-9]+\.+[a-zA-Z0-9]/,
      errorMessage: "Insira um email válido",
      required: true,
      disabled: false,
      type: "text",
    },
    {
      name: "password",
      label: "Senha",
      errorMessage: "Insira sua senha",
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
            onSubmit: (data: { email: string; password: string }) =>
              login(data)
                .then(({ data }) => {
                  toaster.success("Logado com sucesso");
                  userContext.name = data.content.name;
                  userContext.token = data.content.token;

                  cookieManager.setCookie(data.content.token, "token");
                  cookieManager.setCookie(data.content.name, "name");

                  navigate("/companies");
                })
                .catch(({ response }) => toaster.error(response.data.message)),
          }}
        />{" "}
        <GoToRegister to="/register">Criar conta</GoToRegister>
      </LoginPageFormHolder>
    </PageHolder>
  );
};

export default LoginPage;
