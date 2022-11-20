import ErrorPage from '@/pages/ErrorPage';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import {Route, Routes} from 'react-router-dom';

const UnAuthorized = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default UnAuthorized;
