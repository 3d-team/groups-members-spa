import RootPage from '@/pages';
import ErrorPage from '@/pages/ErrorPage';
import ForgotPassword from '@/pages/ForgotPassword';
import Login from '@/pages/Login';
import RedirectPage from '@/pages/RedirectPage';
import Register from '@/pages/Register';
import ResetPassword from '@/pages/ResetPassword';
import {Route, Routes} from 'react-router-dom';

const UnAuthorized = () => {
  return (
    <Routes>
      <Route path="/" element={<RootPage />}>
        <Route index element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword/>} />
        <Route path="/resetpassword/:email" element={<ResetPassword/>} />
        <Route path="/oauth2/redirect" element={<RedirectPage/>} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default UnAuthorized;
