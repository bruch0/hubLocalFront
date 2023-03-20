import styled from "styled-components";

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
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

  :last-of-type {
    margin-top: 20px;
  }
`;

const Submit = styled.button`
  height: 70px;
  color: white;
  border: 0px;
  background-color: #0385fd;
  border-radius: 5px;
  cursor: pointer;
  font-size: 25px;
  text-transform: uppercase;
  font-weight: 600;

  :last-of-type {
    margin-top: 20px;
  }
`;

const Error = styled.span`
  font-size: 15px;
  color: red;
`;

export { Form, Label, Input, Error, Submit };
