import {Provider} from 'react-redux';
import Home from './pages/Home';
import store from './redux/store';
import RootRouterProvider from './routes';

function App() {
  return (
    <Provider store={store}>
      <RootRouterProvider />
    </Provider>
  );
}

export default App;
