import { MouseEventHandler } from "react";

import { Button } from "./styles";

interface ActionButtonProps {
  value: string;
  width: string;
  height: string;
  disabled: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const ActionButton = ({
  value,
  width,
  height,
  disabled,
  onClick,
}: ActionButtonProps) => {
  return (
    <Button width={width} height={height} onClick={onClick} disabled={disabled}>
      {value}
    </Button>
  );
};

export default ActionButton;
