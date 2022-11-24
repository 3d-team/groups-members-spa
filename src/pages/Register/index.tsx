import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Copyright from '@/components/Copyright';
import {useFormik} from 'formik';
import {useMemo, useState} from 'react';
import {useAppDispatch} from '@/redux';
import {authActions} from '@/redux/feature/auth/slice';
import useStyles from './styles';
import {FacebookLogo, GoogleLogo} from '@/assets/svgs';
import clsx from 'clsx';
import {Link} from 'react-router-dom';

const Register = () => {
  const classes = useStyles();

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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
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
            onChange={formik.handleChange}
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
            onChange={formik.handleChange}
          />
          <TextField
            variant="outlined"
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
            variant="outlined"
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
            variant="outlined"
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

          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to={'/'}>Login if you has had account before!</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Register;
