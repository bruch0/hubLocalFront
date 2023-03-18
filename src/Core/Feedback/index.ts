import { ReactElement } from "react";

export class GenericUserFeedback {
  error: (message: string) => void;
  success: (message: string) => void;
  provider?: () => ReactElement;
}
