import styled from "styled-components";
import InputMask from "react-input-mask";

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const InputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  padding: ${(props: { modal: boolean }) => (props.modal ? "25px" : "0px")};
`;

const InputHolder = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props: { nested: boolean }) => (props.nested ? "45%" : "100%")};
  margin-bottom: 20px;

  :last-of-type {
    margin: 0px;
  }
`;

const Label = styled.label`
  font-size: 15px;
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 5px;

  :first-of-type {
    margin-top: 0px;
  }
`;

const Input = styled.input`
  height: 50px;
  color: black;
  border: 1px solid #0385fd;
  border-radius: 5px;
  margin: 0px;
  padding: 0px 10px;
  font-size: 25px;
  text-overflow: ellipsis;
`;

const MaskedInput = styled(InputMask)`
  height: 50px;
  color: black;
  border: 1px solid #0385fd;
  border-radius: 5px;
  margin: 0px;
  padding: 0px 10px;
  font-size: 25px;
  text-overflow: ellipsis;
`;

interface SubmitProps {
  height: string;
  width: string;
  fontSize: string;
  red: boolean;
}

const Submit = styled.button<SubmitProps>`
  height: 70px;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  color: white;
  border: 0px;
  background-color: ${(props) => (props.red ? "#C90808" : "#0385fd")};
  border-radius: 5px;
  cursor: pointer;
  font-size: ${(props) => props.fontSize};
  font-weight: 600;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);

  :last-of-type {
    margin-top: 20px;
  }
`;

const ModalBottom = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0px 20px;
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.25);

  button {
    margin: 0px !important;
  }
`;

const Error = styled.span`
  font-size: 15px;
  color: red;
`;

export {
  Form,
  InputContainer,
  InputHolder,
  Label,
  Input,
  MaskedInput,
  Error,
  ModalBottom,
  Submit,
};
