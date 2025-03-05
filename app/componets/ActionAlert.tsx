import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

interface AlertProps {
  message: string;
  severity?: "error" | "success";
  onClose: () => void;
}

const ActionAlert: React.FC<AlertProps> = ({
  message,
  severity = "error",
  onClose,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-[2000] w-[90%] max-w-lg transition-opacity ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      <Stack
        sx={{
          boxShadow: "0px 10px 20px rgba(0,0,0,0.3)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
        spacing={2}
      >
        <Alert
          severity={severity}
          sx={{
            fontSize: "1rem",
            fontWeight: "bold",
            textAlign: "center",
            padding: "16px",
            bgcolor: severity === "error" ? "#ff4d4f" : "#228B22",
            color: "white",
          }}
          action={
            <Button
              color="inherit"
              size="small"
              onClick={handleClose}
              sx={{ fontWeight: "bold" }}
            >
              CLOSE
            </Button>
          }
        >
          {message}
        </Alert>
      </Stack>
    </div>
  );
};

export default ActionAlert;
