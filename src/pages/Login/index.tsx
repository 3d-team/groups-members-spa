// import {useAppDispatch} from '@/redux';
// import {authActions} from '@/redux/feature/auth/slice';
// import {useMemo, useState} from 'react';
// import {Link, Navigate} from 'react-router-dom';
// import {useFormik} from 'formik';
// import Button from '@material-ui/core/Button';
// import styles from './styles.module.css'

// export default function Login() {
//   const [token, setToken] = useState<string | null>(null);
//   const dispatcher = useAppDispatch();

//   const initialValues = useMemo(() => {
//     return {
//       email: '',
//       password: '',
//     };
//   }, []);

//   const formik = useFormik({
//     initialValues,
//     onSubmit: values => {
//       console.log('@DUKE__onSubmit', values);
//       formik.setValues(initialValues);
//       submitLogin();
//     },
//   });

//   const submitLogin = async () => {
//     setTimeout(() => {
//       setToken('user-1');
//       dispatcher(authActions.loginSucceed());
//     }, 3000);
//   };

//   return (
//     <div className={styles.container}>
//       <form onSubmit={formik.handleSubmit}>
//         {/* Email */}
//         <label htmlFor="email">EmailAddress: </label>
//         <input id="email" name="email" type="email" onChange={formik.handleChange} value={formik.values.email} />
//         <br />
//         <br />
//         {/* Password */}
//         <label htmlFor="email">Password: </label>
//         <input id="password" name="password" type="password" onChange={formik.handleChange} value={formik.values.password} />
//         <br />
//         <br />
//         <Button variant='contained' color='primary' type={'submit'}>Login</Button>
//       </form>
//       <div>
//         <br />
//         <a href="">login with google!</a>
//         <br />
//         <br />
//         <a href="">login with google!</a>
//       </div>
//       <Link to={'/register'}>Register</Link>
//       {token && <Navigate to={'/'} />}
//     </div>
//   );
// }

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Copyright from '@/components/Copyright';
import useStyles from './styles';
import { useFormik } from 'formik';
import { useMemo, useState } from 'react';
import { useAppDispatch } from '@/redux';
import { authActions } from '@/redux/feature/auth/slice';

const Login = () => {
  const classes = useStyles();
  

  const [token, setToken] = useState<string | null>(null);
  const dispatcher = useAppDispatch();

  const initialValues = useMemo(() => {
    return {
      email: '',
      password: '',
    };
  }, []);

    const submitLogin = async () => {
    setTimeout(() => {
      setToken('user-1');
      dispatcher(authActions.loginSucceed());
    }, 3000);
  };

  const formik = useFormik({
    initialValues,
    onSubmit: values => {
      console.log('@DUKE__onSubmit', values);
      formik.setValues(initialValues);
      submitLogin();
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.paper}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formik.values.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default Login;