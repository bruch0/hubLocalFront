import { ReactElement } from "react";

export class GenericModal {
  modal: (children?: React.ReactElement) => ReactElement;
  provider?: (children?: React.ReactElement) => ReactElement;
}
