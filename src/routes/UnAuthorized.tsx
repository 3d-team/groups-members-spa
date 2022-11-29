import RootPage from '@/pages';
import ErrorPage from '@/pages/ErrorPage';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import {Route, Routes} from 'react-router-dom';

const UnAuthorized = () => {
  return (
    <Routes>
      <Route path="/" element={<RootPage />}>
        <Route index element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default UnAuthorized;
