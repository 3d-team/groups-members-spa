import RootPage from '@/pages';
import Dashboard from '@/pages/Dashboard';
import ErrorPage from '@/pages/ErrorPage';
import Class from '@/pages/Class';
import Member from '@/pages/Member';
import {Route, Routes} from 'react-router-dom';
import MyProfile from '@/pages/MyProfile';
import SlideEditor from '@/pages/SlideEditor';
import Presentations from '@/pages/Presentations';
import Home from '@/pages/Home';

const Authorized = () => {
  return (
    <Routes>
      <Route path="/" element={<RootPage />}>
        <Route index element={<Home />} />
        <Route path="/class/:classId" element={<Class />} />
        <Route path="/class/:classId/member" element={<Member />} />
        <Route path="/presentation/:presentationId" element={<SlideEditor />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default Authorized;
