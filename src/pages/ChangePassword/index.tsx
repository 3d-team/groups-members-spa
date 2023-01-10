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
import * as Yup from 'yup';
import UserApi from '@/api/userApi';

const ChangePassword = () => {
  const navigate = useNavigate();
  const theme = createTheme();
  const dispatcher = useAppDispatch();

  const initialValues = useMemo(() => {
    return {
      password: '',
      newPassword: '',
      confirmNewPassword: '',
    };
  }, []);

  const submitChange = async (values: any) => {
    const data = {
      oldPassword: values.password,
      newPassword: values.newPassword
    };
    const response = await UserApi.changePassword(data);
    console.log(response);
    alert('Change password successfully. Please login again!');
    dispatcher(authActions.logout());
    navigate('/');
  }

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required!"),
      newPassword: Yup.string()
        .min(8, "Minimum 8 characters")
        .notOneOf([Yup.ref("password")], "New-password's not match Old-password")
        .required("Required!"),
      confirmNewPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Password's not match")
        .required("Required!")
    }),
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
              type="password"
              autoComplete="password"
              autoFocus
              value={formik.values.password}
              onChange={formik.handleChange}
              error = {formik.errors.password ? true : false}
              helperText={(formik.errors.password && formik.touched.password)? formik.errors.password: ''}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password2"
              label="New Password"
              name="newPassword"
              type="password"
              autoComplete="password"
              autoFocus
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              error = {formik.errors.newPassword ? true : false}
              helperText={(formik.errors.newPassword && formik.touched.newPassword)? formik.errors.newPassword: ''}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password3"
              label="Confirm New Password"
              name="confirmNewPassword"
              type="password"
              autoComplete="password"
              autoFocus
              value={formik.values.confirmNewPassword}
              onChange={formik.handleChange}
              error = {formik.errors.confirmNewPassword ? true : false}
              helperText={(formik.errors.confirmNewPassword && formik.touched.confirmNewPassword)? formik.errors.confirmNewPassword: ''}
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