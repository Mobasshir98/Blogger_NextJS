import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import LoginForm from './loginButton';
import Link from "next/link";
import SignupForm from './signUpButton';
import { useRouter } from 'next/router';


export default function NavBar() {
  // if (typeof window !== 'undefined') {
  //   var userId = localStorage.getItem("userId")
  // }
  const router = useRouter()
    const handleLogout = ()=>{
        localStorage.removeItem("role")
        localStorage.removeItem("userId")
        router.push("/")

    }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color='transparent' >
        <Toolbar sx={{display:"flex",justifyContent:"space-between"}} >
            

        <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
              onClick={()=>{router.push("/")}}
            >
            Blogger
          </Typography>
               
              {
               typeof window !== 'undefined'&&localStorage.getItem("userId") &&(
                    <Link href="/create-blog" >
            

            <Button variant='outlined' sx={{ ml: "auto", cursor: "pointer" }}>
              Create Blog
            </Button>
            
          </Link>
                )

              }
          {
            typeof window !== 'undefined'&&localStorage.getItem("userId")?(<Button onClick={handleLogout} variant='outlined' color='primary' >
                Logout
            </Button>):(
                <Box display={"flex"} gap={2} >
          <LoginForm/>
          <SignupForm/>
          </Box>

            )
          }
          
        </Toolbar>
      </AppBar>
      <Divider/>
    </Box>
  );
}