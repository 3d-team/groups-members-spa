import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useFormik} from 'formik';
import {useMemo, useState} from 'react';
import {useAppDispatch} from '@/redux';
import {authActions} from '@/redux/feature/auth/slice';
import {Link, useNavigate} from 'react-router-dom';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import * as Yup from 'yup';

import axios from 'axios';

const theme = createTheme();

const ForgotPassword = () => {
  const navigate = useNavigate();

  const initialValues = useMemo(() => {
    return {
      email: '',
      redirectUrl: 'http:/localhost:3000/resetpassword'
    };
  }, []);

  const submitForgot = async (values: any) => {
    // await axios
    //   .post('http://localhost:8080/api/requestPasswordReset', {
    //     email: values.email,
    //   })
    //   .then(response => {

    //   })
    //   .catch((err) => console.error(err)); 

    alert('Password change request has been sent!');
    setTimeout(() => {
      navigate(`/resetpassword/${formik.values.email}`);
    }, 500);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    }),
    onSubmit: values => {
      formik.setValues(initialValues);
      submitForgot(values);
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
            Forgot Password
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{mt: 1}}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Enter your email address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formik.values.email}
              onChange={formik.handleChange}
              error = {formik.errors.email ? true : false}
              helperText={(formik.errors.email && formik.touched.email)? formik.errors.email: ''}
            />

            <Button type="submit" fullWidth variant="contained" color="primary" sx={{mt: 1, mb: 2, p: 1.5}}>
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ForgotPassword;
