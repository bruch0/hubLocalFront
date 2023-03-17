import { Link } from "react-router-dom";
import styled from "styled-components";

const PageHolder = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

const RegisterPageDisclaimerHolder = styled.div`
  width: 50vw;
  height: 100vh;
`;

const ImageBackground = styled.div`
  background-color: #0485ff;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 70%;
`;

const ImageCover = styled.img`
  width: 100%;
  height: 90%;
`;

const DisclaimerHolder = styled.div`
  background-color: #00cc99;
  height: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DisclaimerTitle = styled.p`
  color: white;
  font-size: 35px;
  font-weight: bold;
  width: 50%;
  text-align: center;
`;

const DisclaimerContent = styled.p`
  color: white;
  font-size: 20px;
  width: 70%;
  text-align: center;
  margin-top: 25px;
`;

const RegisterPageFormHolder = styled.div`
  width: 60vw;
  height: 100vh;
  padding: 0px 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img``;

const GoToRegister = styled(Link)`
  width: 100%;
  height: 70px;
  color: white;
  background-color: #00cc99;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  font-size: 25px;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;

  :last-of-type {
    margin-top: 20px;
  }
`;

export {
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
};
