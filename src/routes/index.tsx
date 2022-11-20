import Pages from '@/pages';
import ErrorPage from '@/pages/ErrorPage';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import {useAppSelector} from '@/redux';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Authorized from './Authorized';
import UnAuthorized from './UnAuthorized';

const RootRouterProvider = () => {
  const isLogedIn = useAppSelector(state => state.auth.isLogedIn);
  console.log('@DUKE__isLogedIn', isLogedIn);

  return <BrowserRouter>{isLogedIn ? <Authorized /> : <UnAuthorized />}</BrowserRouter>;
  // return (
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path="/" element={<Pages />}>
  //         <Route path="/login" element={<Login />} />
  //         <Route path="/register" element={<Register />} />
  //         <Route path="*" element={<ErrorPage />} />
  //       </Route>
  //     </Routes>
  //   </BrowserRouter>
  // );
};

export default RootRouterProvider;
