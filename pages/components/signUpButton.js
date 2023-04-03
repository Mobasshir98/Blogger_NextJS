import { Button } from "@mui/material";
import SignupModal from "./signupModal";
import { useState } from "react";
const SignupForm = () => {
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
        Signup
      </Button>
      <SignupModal open={open} handleClose={handleClose} />
    </>
  );
};

export default SignupForm