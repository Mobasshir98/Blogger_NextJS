import { Button } from "@mui/material";
import LoginModal from "./loginModal";
import { useState } from "react";

const LoginForm = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Login
      </Button>
      <LoginModal open={open} handleClose={handleClose} />
    </>
  );
};

export default LoginForm;
