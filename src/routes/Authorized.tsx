import RootPage from '@/pages';
import ErrorPage from '@/pages/ErrorPage';
import Class from '@/pages/Class';
import Member from '@/pages/Member';
import {Route, Routes} from 'react-router-dom';
import SlideEditor from '@/pages/SlideEditor';
import Home from '@/pages/Home';
import PresentingPage from '@/pages/PresentingPage';
import MyProfile from '@/pages/PresentingPage';
import VotingPage from '@/pages/VotingPage';

const Authorized = () => {
  return (
    <Routes>
      <Route path="/" element={<RootPage />}>
        <Route index element={<Home />} />
        <Route path="/class/:classId" element={<Class />} />
        <Route path="/class/:classId/member" element={<Member />} />
        <Route path="/presentation/:presentationId" element={<SlideEditor />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="presenting/:presentationId" element={<PresentingPage />} />
        <Route path="presentation-voting/:presentationId" element={<VotingPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default Authorized;
