import styled from "styled-components";

interface ButtonProps {
  width: string;
  height: string;
}

const Button = styled.button<ButtonProps>`
  border: 0px;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: #0385fd;
  color: white;
  font-size: 150%;
  font-weight: 600;
  border-radius: 5px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  cursor: pointer;

  :disabled {
    background-color: #e4e4e4;
    color: #5c5c5c;
  }
`;

export { Button };
