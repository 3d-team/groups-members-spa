import { useFormik } from 'formik';
import React, { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux';
import { appActions } from '@/redux/feature/app/slice';
import { useNavigate, useParams } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { authActions } from '@/redux/feature/auth/slice';

const theme = createTheme();

const ResetPassword = () => {
  const navigate = useNavigate();
  const { email } = useParams();

  const submitChange = async (values: any) => {
    // await axios
    //   .post('http://localhost:8080/api/resetpassword', {
    //     email: values.email,
    //     password: values.password,
    //     newPassword: values.newPassword
    //   })
    //   .then(response => (response.status))
    //   .catch(console.log);

    alert('Change password successfully!');
    setTimeout(() => {
      navigate('/');
    }, 700);
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            backgroundColor: "gray",
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '16px',
            justifyContent: 'center',
          }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Password Reset
          </Typography>

          <Box 
              sx={{ 
              mt: 1,
              ml: 2, mr :2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
                }}>
            <Typography >
              An email with a new password has been send to your email:
              <b>{email}</b>
            </Typography>
            <Typography>
              You can login and change new password!
            </Typography>
            <Button sx={{ m: 5 }} variant="contained" onClick={() => navigate('/')}>
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ResetPassword;