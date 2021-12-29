import React, { ReactElement } from "react";

import { ButtonWrap } from "./styles";

type ButtonPropsType = {
  handleClick: () => void;
  onHover?: (arg: boolean) => void;
  children: React.ReactNode;
  disabled?: boolean;
};

const SvgButton = ({
  children,
  handleClick,
  onHover,
  disabled,
}: ButtonPropsType): ReactElement => {
  const handleOnMouseEnter = () => {
    onHover?.(true);
  };
  const handleOnMouseLeave = () => {
    onHover?.(false);
  };

  return (
    <ButtonWrap
      onClick={handleClick}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      disabled={disabled}
    >
      {children}
    </ButtonWrap>
  );
};
export default SvgButton;
