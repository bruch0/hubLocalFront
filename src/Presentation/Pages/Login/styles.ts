import styled from "styled-components";

const PageHolder = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

const LoginPageDisclaimerHolder = styled.div`
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

const LoginPageFormHolder = styled.div`
  width: 60vw;
  height: 100vh;
  padding: 0px 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img``;

export {
  PageHolder,
  LoginPageDisclaimerHolder,
  ImageBackground,
  ImageCover,
  DisclaimerHolder,
  DisclaimerTitle,
  DisclaimerContent,
  LoginPageFormHolder,
  Logo,
};
