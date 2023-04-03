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
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";


const SignupModal = ({ open, handleClose }) => {

    const router = useRouter()
    const [values, setValues] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      showPassword: false,
    });
  
    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  
    const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    const handleSignup = async () => {
        const {name,email,password} = values
        try{
            const response = await axios.post("http://localhost:3000/api/auth/register",{
                name,
                email,
                password
            })
            // console.log(response)
            handleClose()
            toast.success(response.data.message)
            router.push('/')

        }catch(err){
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
      Signup
    </Typography>
    <Box sx={{ mt: 2 }}>
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        value={values.name}
        onChange={handleChange("name")}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        sx={{ mt: 2 }}
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
        onClick={handleSignup}
      >
        Signup
      </Button>
    </Box>
  </Box>
</Modal>
);
};

export default SignupModal