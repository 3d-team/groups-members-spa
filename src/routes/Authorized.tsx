import RootPage from '@/pages';
import ErrorPage from '@/pages/ErrorPage';
import Home from '@/pages/Home';
import Rooms from '@/pages/Roms';
import {Route, Routes} from 'react-router-dom';

const Authorized = () => {
  return (
    <Routes>
      <Route path="/" element={<RootPage />}>
        <Route index element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default Authorized;
