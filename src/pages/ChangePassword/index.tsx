import {useFormik} from 'formik';
import React, { useMemo, useState} from 'react';
import {useAppDispatch, useAppSelector} from '@/redux';
import {appActions} from '@/redux/feature/app/slice';
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import axios from 'axios';
import {authActions} from '@/redux/feature/auth/slice';
import {Link} from 'react-router-dom';

const ChangePassword = () => {
  const navigate = useNavigate();
  const theme = createTheme();

  const initialValues = useMemo(() => {
    return {
      password: '',
      newPassword: '',
      confirmNewPassword: '',
    };
  }, []);

  const submitChange = async (values: any) => {
    // await axios
    //   .post('http://localhost:8080/api/changepassword', {
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

  const formik = useFormik({
    initialValues,
    onSubmit: values => {
      formik.setValues(initialValues);
      submitChange(values);
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Change Password
          </Typography>

          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{mt: 1}}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              autoComplete="password"
              autoFocus
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="newpassword"
              label="New Password"
              type="newpassword"
              id="newpassword"
              autoComplete="new-password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="confirmpassword"
              label="Confirm New Password"
              name="confirmpassword"
              autoComplete="new-password"
              value={formik.values.confirmNewPassword}
              onChange={formik.handleChange}
            />
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{mt: 3, mb: 2, p: 2}}>
              Change password
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ChangePassword;