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
import {Link} from 'react-router-dom';
import {createTheme, ThemeProvider} from '@mui/material/styles';

const theme = createTheme();

const Register = () => {
  const [token, setToken] = useState<string | null>(null);
  const dispatcher = useAppDispatch();

  const initialValues = useMemo(() => {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      mssv: '',
      fullname: '',
      yearBorn: 2001,
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
              name="mssv"
              label="Mã số sinh viên"
              type="text"
              id="mssv"
              value={formik.values.mssv}
              onChange={formik.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="fullname"
              label="Fullname"
              type="text"
              id="fullname"
              value={formik.values.fullname}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="yearBorn"
              label="Year Born"
              type="number"
              id="year_born"
              value={formik.values.yearBorn}
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
