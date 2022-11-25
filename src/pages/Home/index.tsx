import {useAppDispatch, useAppSelector} from '@/redux';
import {authActions} from '@/redux/feature/auth/slice';
import UserThunks from '@/redux/feature/user/thunk';
import {useEffect} from 'react';

export default function Home() {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  const submitLogin = async () => {
    dispatcher(authActions.loginSucceed());
  };

  const dispatcher = useAppDispatch();

  const submitLogout = () => {
    dispatcher(authActions.logout());
  };

  const getUserById = async (id: number) => {
    // const data = await UserApi.getUserById(id);
    dispatcher(UserThunks.getUserById(3));
  };

  useEffect(() => {
    getUserById(1);
  }, []);

  if (!isLoggedIn) {
    return (
      <div>
        <button onClick={submitLogin}>Login</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Welcome Home: You have logged in</h2>
      <button onClick={submitLogout}>Log out</button>
    </div>
  );
}
