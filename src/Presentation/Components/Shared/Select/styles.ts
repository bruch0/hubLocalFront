import styled from "styled-components";

const RelativeHolder = styled.div`
  position: relative;
  width: ${(props: { width: string }) => props.width};
  z-index: 3;
`;

interface ScrollableHolderProps {
  maxHeight: string;
  width: string;
  optionHeight: number;
  optionsQuantity: number;
}

const ScrollableHolder = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  max-height: ${(props: ScrollableHolderProps) => props.maxHeight};
  width: ${(props: ScrollableHolderProps) => props.width};
  overflow: scroll;
  border: 1px solid #00274e80;
  border-radius: 5px;

  ::-webkit-scrollbar {
    width: ${(props: ScrollableHolderProps) =>
      props.optionHeight * props.optionsQuantity > parseInt(props.maxHeight)
        ? "4px"
        : "0px"};
  }

  ::-webkit-scrollbar-track {
    background: white;
  }

  ::-webkit-scrollbar-thumb {
    background: #e2e8f1;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #e2e8f1;
  }
`;

interface SelectedOptionProps {
  height?: string;
  width: string;
  disabled?: boolean;
}

const SelectedOption = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #00274e80;
  height: ${(props: SelectedOptionProps) => props.height ?? "70px"};
  border-radius: 5px;
  width: ${(props: SelectedOptionProps) => props.width};
  opacity: ${(props: SelectedOptionProps) => (props.disabled ? " 0.6" : "")};
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
  height: ${(props: { height?: string }) => props.height ?? "70px"};
  min-height: ${(props: { height?: string }) => props.height ?? "70px"};
  width: 100%;
  background-color: transparent;
  font-weight: 400;
  cursor: pointer;

  :hover {
    background-color: #ffe8d8;
  }
`;

export { RelativeHolder, ScrollableHolder, SelectableOption, SelectedOption };
