import styled from "styled-components";

const PaginationContainer = styled.div`
  width: 100%;
  border-radius: 5px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 70px;
`;

const PaginationHolder = styled.div`
  border-radius: 5px;
  border: 1px solid #d6d6d6;
  display: flex;
  align-items: center;
  padding: 0px 30px;
  height: 100%;
`;

const PageNumber = styled.div`
  border-right: 1px solid #d6d6d6;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-right: 20px;
  padding-right: 20px;
`;

const ItemsPerPageHolder = styled.div`
  position: relative;
  height: 40px;
  margin-right: 20px;
`;

const SelectedOption = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  color: black;
  height: 40px;
  font-size: 16px;
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
  bottom: 5px;
  right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #d6d6d6;
  border-radius: 5px;
  background-color: white;
`;

const ItemName = styled.span`
  font-weight: bold;
`;

const ChangePageButton = styled.button`
  color: white;
  background-color: #0385fd;
  border: 0px;
  height: 35px;
  font-size: 16px;
  border: 1px solid #e4e4e4;
  cursor: pointer;

  :disabled {
    background-color: #e4e4e4;
    color: #5c5c5c;
  }

  :first-of-type {
    border-radius: 5px 0px 0px 5px;
    border-right: 0px;
  }

  :last-of-type {
    border-radius: 0px 5px 5px 0px;
  }
`;

export {
  PaginationContainer,
  PaginationHolder,
  SelectedOption,
  PageNumber,
  ItemsPerPageHolder,
  OptionButton,
  OptionsHolder,
  ItemName,
  ChangePageButton,
};
