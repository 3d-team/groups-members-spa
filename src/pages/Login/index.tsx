import {useAppDispatch} from '@/redux';
import {authActions} from '@/redux/feature/auth/slice';
import {useState} from 'react';
import {Navigate} from 'react-router-dom';

export default function Login() {
  const [token, setToken] = useState<string | null>(null);
  const dispatcher = useAppDispatch();
  const submitLogin = async () => {
    setTimeout(() => {
      setToken('user-1');
      dispatcher(authActions.loginSuccessed);
    }, 3000);
  };

  return (
    <div>
      <button onClick={submitLogin}>Login</button>
      {token && <Navigate to={'/'} state={'abc'} replace />}
    </div>
  );
}
