import {useAppDispatch, useAppSelector} from '@/redux';
import {authActions} from '@/redux/feature/auth/slice';
import {Link, useLocation} from 'react-router-dom';

export default function Home() {
  const location = useLocation();

  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  console.log('@DUKE_location', location.state);

  const submitLogin = async () => {
    // setTimeout(() => {
    dispatcher(authActions.loginSuccessed());
    // }, 3000);
  };

  const dispatcher = useAppDispatch();
  if (!isLoggedIn) {
    return (
      // <div>
      //   <Link to={'/login'}>Login</Link>
      //   <br />
      //   <br />
      //   <Link to={'/register'}>Register</Link>
      // </div>
      <div>
        <button onClick={submitLogin}>login</button>
      </div>
    );
  }
  return <div>Welcome Home: You have logged in</div>;
}
