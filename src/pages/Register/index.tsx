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

import axios from 'axios';

const theme = createTheme();

const Register = () => {
  const navigate = useNavigate();

  const initialValues = useMemo(() => {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      studentId: '',
      fullName: '',
      dob: new Date(),
    };
  }, []);

  const submitLogin = async (values: any) => {
    let userId = '';
    await axios
      .post('http://localhost:8080/api/register', {
        email: values.email,
        password: values.password,
        retype: values.password,
        studentId: values.studentId,
        fullName: values.fullName,
      })
      .then(response => (userId = response.data))
      .catch(console.log);

    alert('Register successfully!');
    setTimeout(() => {
      navigate('/');
    }, 700);
  };

  const formik = useFormik({
    initialValues,
    onSubmit: values => {
      formik.setValues(initialValues);
      submitLogin(values);
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
            Register
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{mt: 1}}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="studentId"
              label="Mã số sinh viên"
              type="text"
              id="studentId"
              value={formik.values.studentId}
              onChange={formik.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="fullName"
              label="Fullname"
              type="text"
              id="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="dob"
              label="Date Of Birth"
              type="number"
              id="dob"
              value={formik.values.dob}
              onChange={formik.handleChange}
            />

            <Button type="submit" fullWidth variant="contained" color="primary" sx={{mt: 1, mb: 2, p: 1.5}}>
              Register
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to={'/'}>Login if you has had account before!</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
