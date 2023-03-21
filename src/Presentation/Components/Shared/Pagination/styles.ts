import styled from "styled-components";

const PaginationHolder = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0px 30px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  border-radius: 5px 5px 0px 0px;
`;

const SelectedOption = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  color: black;
  height: 40px;
  font-size: 16px;
  width: 50px;
  cursor: pointer;
`;

const OptionButton = styled.button`
  background-color: transparent;
  border: 0px;
  margin: 0px;
  padding: 0px;
  width: 60px;
  height: 40px;
  border-bottom: 1px solid #d6d6d6;
  font-size: 16px;
  color: black;
  cursor: pointer;

  :hover {
    background-color: #d6d6d6;
  }

  :first-of-type {
    border-radius: 5px 5px 0px 0px;
  }

  :last-of-type {
    border-radius: 0px 0px 5px 5px;
  }
`;

const OptionsHolder = styled.div`
  position: absolute;
  z-index: 1;
  bottom: -1px;
  right: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #d6d6d6;
  border-radius: 5px;
  background-color: white;
`;

export { SelectedOption, PaginationHolder, OptionButton, OptionsHolder };
