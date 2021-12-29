import React, { FC } from "react";
import { Snackbar, Alert } from "@mui/material";

interface IProps {
  type: "success" | "error";
  open: boolean;
  message: string;
  onClose: () => void;
  position?: "center" | "left" | "right";
}
const ModalAleart: FC<IProps> = ({
  type,
  open,
  message,
  onClose,
  position,
}: IProps) => {
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: position || "center" }}
        onClose={onClose}
      >
        <Alert severity={type} onClose={onClose}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ModalAleart;
