import {useAppSelector} from '@/redux';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Authorized from './Authorized';
import UnAuthorized from './UnAuthorized';

const RootRouterProvider = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  console.log('@DUKE_RootRouterProvider__isLogedIn', isLoggedIn);
  return <BrowserRouter>{isLoggedIn ? <Authorized /> : <UnAuthorized />}</BrowserRouter>;
};

export default RootRouterProvider;
