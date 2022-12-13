import RootPage from '@/pages';
import Dashboard from '@/pages/Dashboard';
import ErrorPage from '@/pages/ErrorPage';
import Class from '@/pages/Class';
import Member from '@/pages/Member';
import {Route, Routes} from 'react-router-dom';
import MyProfile from '@/pages/MyProfile';
import SlideEditor from '@/pages/SlideEditor';
import Presentations from '@/pages/Presentations';

const Authorized = () => {
  return (
    <Routes>
      <Route path="/" element={<SlideEditor />}>
        <Route index element={<Dashboard />} />
        <Route path="/class/:classId" element={<Class />} />
        <Route path="/class/:classId/member" element={<Member />} />
        <Route path="/presentation" element={<Presentations />} />
        <Route path="/presentation/:presentationId" element= {<a>Presentation Detail</a>} />
        <Route path="/presentation/:presentationId/:slideId" element= {<a>Edit Slide</a>} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default Authorized;
