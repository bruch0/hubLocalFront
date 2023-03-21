import { useEffect, useState } from "react";

import {
  RelativeHolder,
  ScrollableHolder,
  SelectableOption,
  SelectedOption,
} from "./styles";

interface SelectHolderProps {
  maxHeight: string;
  selectedOption: React.ReactElement;
  selectorWidth: string;
  optionHeight: string;
  optionsQuantity: number;
  children: React.ReactElement;
  noClosureOnClickInside?: boolean;
  disabled?: boolean;
}

interface SelectOptionProps {
  height?: string;
  children: React.ReactElement;
  onClick: () => void;
}

const SelectHolder = ({
  maxHeight,
  selectedOption,
  selectorWidth,
  children,
  optionHeight,
  optionsQuantity,
  noClosureOnClickInside,
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

  useEffect(() => setOpen(false), [noClosureOnClickInside]);

  return (
    <>
      {open ? (
        <RelativeHolder
          width={selectorWidth}
          onMouseEnter={removeEventListener}
          onMouseLeave={addEventListener}
        >
          <ScrollableHolder
            optionHeight={parseInt(optionHeight)}
            optionsQuantity={optionsQuantity}
            width="100%"
            maxHeight={maxHeight}
            onClick={() => (noClosureOnClickInside ? null : setOpen(false))}
          >
            {children}
          </ScrollableHolder>
        </RelativeHolder>
      ) : (
        <SelectedOption
          height={optionHeight}
          width={selectorWidth}
          onClick={() => {
            if (!disabled) setOpen(true);
          }}
          disabled={disabled}
        >
          <>
            {selectedOption}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
            >
              <path
                d="M1.41 0.579956L6 5.16996L10.59 0.579956L12 1.99996L6 7.99996L0 1.99996L1.41 0.579956Z"
                fill="black"
              />
            </svg>
          </>
        </SelectedOption>
      )}
    </>
  );
};

const SelectOption = ({ height, children, onClick }: SelectOptionProps) => {
  return (
    <SelectableOption onClick={onClick} height={height}>
      {children}
    </SelectableOption>
  );
};

export { SelectHolder, SelectOption };
