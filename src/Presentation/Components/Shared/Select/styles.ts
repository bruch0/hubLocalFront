import styled from "styled-components";

const RelativeHolder = styled.div`
  position: relative;
  height: 320px;
  z-index: 1;
  width: 100%;
`;

const ScrollableHolder = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  max-height: 320px;
  height: 100%;
  width: 20%;
  overflow: scroll;
  border: 0px;
  background-color: #efeded;
  top: 120px;

  ::-webkit-scrollbar {
    width: 0px;
  }
`;

interface SelectedOptionProps {
  disabled?: boolean;
}

const SelectedOption = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  border-radius: 5px;
  border: 0px;
  margin: 0px;
  padding: 0px;
  width: 20%;
  opacity: ${(props: SelectedOptionProps) => (props.disabled ? " 0.6" : "")};
  height: 100%;
  background-color: transparent;
  font-weight: 400;
  cursor: pointer;

  :disabled {
    cursor: not-allowed;
  }
`;

const SelectableOption = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  border-radius: 5px;
  border: 0px;
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 100%;
  background-color: transparent;
  font-weight: 400;
  cursor: pointer;

  :disabled {
    cursor: not-allowed;
  }
`;

export { RelativeHolder, ScrollableHolder, SelectableOption, SelectedOption };
