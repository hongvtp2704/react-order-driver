import { FC } from "react";
import { Button as ButtonComponent, CircularProgress } from "@material-ui/core";

type Props = {
  isLoading?: boolean;
  title: string;
  type?: "submit" | "button";
  className?: string;
  onClick?: () => void;
  fullWidth?: boolean;
  variant?: "text" | "contained" | "outlined";
};

const Button: FC<Props> = ({
  title,
  className,
  fullWidth,
  isLoading,
  onClick,
  type,
  variant,
}: Props) => {
  return (
    <>
      <ButtonComponent
        type={type || "button"}
        variant={variant || "contained"}
        className={className}
        disabled={isLoading}
        onClick={onClick}
        fullWidth={fullWidth}
      >
        {isLoading ? <CircularProgress color="inherit" size={25} /> : title}
      </ButtonComponent>
    </>
  );
};

export default Button;
