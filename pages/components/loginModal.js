import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Input,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-hot-toast";

const LoginModal = ({ open, handleClose }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const router = useRouter()

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async () => {
    const {email,password}= values
    try{
        const respose = await axios.post("http://localhost:3000/api/auth/login",{email,password})
        handleClose();
        localStorage.setItem("role", respose.data.role)
        localStorage.setItem("userId", respose.data.userId)
        toast.success("Login Successfully")
        router.push("/")
    }
    catch(err){
        // console.log(err)
        toast.error(err.response.data.message)
    }
    
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" align="center">
          Login
        </Typography>
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={values.email}
            onChange={handleChange("email")}
          />
          <FormControl fullWidth sx={{ mt: 2 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <Input
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default LoginModal