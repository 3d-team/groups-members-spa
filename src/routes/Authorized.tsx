import RootPage from '@/pages';
import Dashboard from '@/pages/Dashboard';
import ErrorPage from '@/pages/ErrorPage';
import Home from '@/pages/Home';
import Class from '@/pages/Class';
import {Route, Routes} from 'react-router-dom';

const Authorized = () => {
  return (
    <Routes>
      <Route path="/" element={<RootPage />}>
        <Route index element={<Dashboard />} />
        <Route path="/class/:classId" element={<Class />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default Authorized;
