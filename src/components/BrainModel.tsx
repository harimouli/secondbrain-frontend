import { Modal, Box, IconButton } from "@mui/material";
import { RxCross2 as CloseIcon } from "react-icons/rx";
export const BrainModal = ({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          bgcolor: "background.paper",
          p: 1,
          left: "50%",
          top: "50%",
          position: "absolute",
          transform: "translate(-50%, -50%)",
          outline: "none",
          borderRadius: "8px",
          maxHeight: "95vh",
          overflowY: "auto",
          fontsize: {
            xs: "5px",
            sm: "5px",
            md: "5px",
            lg: "20px",
          },
          width: {
            xs: "90%",
            sm: "70%",
            md: "55%",
            lg: "50%",
          },
          transition: "all 0.3s ease-in-out",
        }}
      >
        <IconButton
          onClick={onClose}
          color="primary"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 10,
          }}
        >
          <CloseIcon />
        </IconButton>
        {children}
      </Box>
    </Modal>
  );
};
