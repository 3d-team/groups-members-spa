import {useAppSelector} from '@/redux';
import {BrowserRouter} from 'react-router-dom';
import Authorized from './Authorized';
import UnAuthorized from './UnAuthorized';

const RootRouterProvider = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  // return <BrowserRouter>{isLoggedIn ? <Authorized /> : <UnAuthorized />}</BrowserRouter>;
  return <BrowserRouter>{<Authorized />}</BrowserRouter>;
};

export default RootRouterProvider;
