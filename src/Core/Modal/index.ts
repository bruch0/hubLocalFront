import { ReactElement } from "react";

export class GenericModal {
  modal: ({
    modalContent,
    modalTitle,
    backgroundColor,
    openButton,
  }: {
    modalContent: React.ReactElement;
    modalTitle: string;
    backgroundColor: string;
    openButton?: React.ReactElement;
  }) => ReactElement;
  provider?: (children?: React.ReactElement) => ReactElement;
}
