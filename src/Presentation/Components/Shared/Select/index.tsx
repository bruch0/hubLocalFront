import { useState } from "react";

import {
  RelativeHolder,
  ScrollableHolder,
  SelectableOption,
  SelectedOption,
} from "./styles";

interface SelectHolderProps {
  selectedOption: React.ReactElement;
  children: React.ReactElement;
  disabled?: boolean;
}

const SelectHolder = ({
  selectedOption,
  children,
  disabled,
}: SelectHolderProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const closeDropdown = () => {
    setOpen(false);
    document.body.removeEventListener("click", closeDropdown);
  };

  const addEventListener = () => {
    document.body.addEventListener("click", closeDropdown);
  };

  const removeEventListener = () => {
    document.body.removeEventListener("click", closeDropdown);
  };

  return (
    <>
      {open ? (
        <RelativeHolder
          onMouseEnter={removeEventListener}
          onMouseLeave={addEventListener}
        >
          <ScrollableHolder
            onClick={() => {
              setOpen(false);
            }}
          >
            {children}
          </ScrollableHolder>
        </RelativeHolder>
      ) : (
        <SelectedOption
          onClick={() => {
            if (!disabled) setOpen(true);
          }}
          disabled={disabled}
        >
          <>{selectedOption}</>
        </SelectedOption>
      )}
    </>
  );
};

interface SelectOptionProps {
  height: string;
  children: React.ReactElement;
  onClick: () => void;
}

const SelectOption = ({ children, onClick }: SelectOptionProps) => {
  return <SelectableOption onClick={onClick}>{children}</SelectableOption>;
};

export { SelectHolder, SelectOption };
