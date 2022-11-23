import {useAppDispatch} from '@/redux';
import {authActions} from '@/redux/feature/auth/slice';
import {useMemo, useState} from 'react';
import {Link, Navigate} from 'react-router-dom';
import {useFormik} from 'formik';

export default function Login() {
  const [token, setToken] = useState<string | null>(null);
  const dispatcher = useAppDispatch();

  const initialValues = useMemo(() => {
    return {
      email: '',
      password: '',
    };
  }, []);

  const formik = useFormik({
    initialValues,
    onSubmit: values => {
      console.log('@DUKE__onSubmit', values);
      formik.setValues(initialValues);
    },
  });

  const submitLogin = async () => {
    setTimeout(() => {
      setToken('user-1');
      dispatcher(authActions.loginSucceed());
    }, 3000);
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        {/* Email */}
        <label htmlFor="email">EmailAddress: </label>
        <input id="email" name="email" type="email" onChange={formik.handleChange} value={formik.values.email} />
        <br />
        <br />
        {/* Password */}
        <label htmlFor="email">Password: </label>
        <input id="password" name="password" type="password" onChange={formik.handleChange} value={formik.values.password} />
        <br />
        <br />
        <button type="submit">Login</button>
      </form>

      <div>
        <br />
        <a href="">login with google!</a>
        <br />
        <br />
        <a href="">login with google!</a>
      </div>
      <Link to={'/register'}>Register</Link>
      {token && <Navigate to={'/'} />}
    </div>
  );
}
