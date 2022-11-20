import ErrorPage from '@/pages/ErrorPage';
import Home from '@/pages/Home';
import {Route, Routes} from 'react-router-dom';

const Authorized = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Authorized;
