import { ReactElement } from "react";

export class GenericModal {
  modal: ({
    modalContent,
    modalTitle,
    backgroundColor,
    openButton,
    isOpen,
    setIsOpen,
  }: {
    modalContent: React.ReactElement;
    modalTitle: string;
    backgroundColor: string;
    openButton?: React.ReactElement;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => ReactElement;
  provider?: (children?: React.ReactElement) => ReactElement;
}
