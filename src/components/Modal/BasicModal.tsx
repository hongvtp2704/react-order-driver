import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

import makeStyles from "./styles";

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  title: string;
  modalContent: React.ReactNode;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
  borderRadius: "4px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const BasicModal: React.FC<ModalProps> = ({
  isOpen,
  title,
  modalContent,
  handleClose,
}: ModalProps) => {
  const classes = makeStyles();

  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby={title}
        aria-describedby={title}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            component="div"
          >
            {modalContent}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default BasicModal;
