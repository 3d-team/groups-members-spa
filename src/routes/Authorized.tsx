import RootPage from '@/pages';
import ErrorPage from '@/pages/ErrorPage';
import Home from '@/pages/Home';
import {Route, Routes} from 'react-router-dom';

const Authorized = () => {
  console.log('@DUKE_Authorized');

  return (
    <Routes>
      <Route path="/" element={<RootPage />}>
        <Route index element={<Home />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default Authorized;
