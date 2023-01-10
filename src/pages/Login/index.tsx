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
import Copyright from '@/components/Copyright';
import {useFormik} from 'formik';
import {useMemo, useState} from 'react';
import {useAppDispatch} from '@/redux';
import {authActions} from '@/redux/feature/auth/slice';
import {Link} from 'react-router-dom';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {FacebookLogo, GoogleLogo} from '@/assets/svgs';
import useStyles from './styles';
import * as Yup from 'yup';

import axios from 'axios';
import { UserActions } from '@/redux/feature/user/slice';
import { UserModel } from '@/models/user';

const theme = createTheme();
// import theme from '@/theme';

const Login = () => {
  const classes = useStyles();
  const dispatcher = useAppDispatch();

  const initialValues = useMemo(() => {
    return {
      email: '',
      password: '',
    };
  }, []);

  const submitLogin = (values: any) => {
    console.log(values);
    const payload = {
      email: values.email,
      password: values.password,
    };
    axios
      .post('http://localhost:8080/api/login', payload)
      .then(async (response) => {
        const token = response.data;
        const axiosClient = axios.create({
          baseURL: 'http://localhost:8080/',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        const url = `/api/profile`;
        const profile = await axiosClient.get(url);
        console.log(profile.data);

        dispatcher(UserActions.updateProfileUser(profile.data));
        dispatcher(authActions.setToken(response.data));
        dispatcher(authActions.loginSucceed());
      })
      .catch(error => {
        console.log(error);
        alert("Đăng nhập thất bại.");
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Required!"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required!"),
    }),
    onSubmit: values => {
      formik.setValues(initialValues);
      submitLogin(values);
    },
  });

  const loginByGoogle = () => {
    window.open('http://localhost:8080/oauth2/authorization/google', '_self');
  };

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
            Sign in
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
              error = {formik.errors.email ? true : false}
              helperText={(formik.errors.email && formik.touched.email)? formik.errors.email: ''}
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
              error = {formik.errors.password ? true : false}
              helperText={(formik.errors.password && formik.touched.password)? formik.errors.password: ''}
            />
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{mt: 3, mb: 2, p: 2}}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to={'/forgotpassword'}>Forgot password?</Link>
              </Grid>
              <Grid item>
                <Link to={'/register'}>{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </Box>

          <Button fullWidth variant="contained" color="inherit" sx={{mt: 4, mb: 2}} onClick={loginByGoogle}>
            <img src={GoogleLogo} alt="Google_Logo" />
            <p className={classes.textBtn}>Sign in with Google</p>
          </Button>
          {/* <Button fullWidth variant="contained" color="inherit" sx={{mt: 2, mb: 2}}>
            <img src={FacebookLogo} alt="Facebook_logo" width={24} />
            <p className={classes.textBtn}>Sign in with Facebook</p>
          </Button> */}
        </Box>
        <Copyright sx={{mt: 8, mb: 4}} />
      </Container>
    </ThemeProvider>
  );
};

export default Login;
