import {CircularProgress} from '@mui/material';
import {useNavigate, useSearchParams} from 'react-router-dom';

import {useAppDispatch} from '@/redux';
import {authActions} from '@/redux/feature/auth/slice';
import CenterContainer from '@/components/CenterContainer';

export default function RedirectPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatcher = useAppDispatch();
  const navigate = useNavigate();

  setTimeout(() => {
    const token = searchParams.get('token');
    const tokenValue = token ? token : '';
    console.log(searchParams.get('token'));
    dispatcher(authActions.setToken(tokenValue));
    dispatcher(authActions.loginSucceed());
    navigate('/');
  }, 1500);

  return (
    // <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
    //   <CircularProgress />
    // </div>
    <CenterContainer>
      <CircularProgress />
    </CenterContainer>
  );
}
