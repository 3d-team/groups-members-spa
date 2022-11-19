import {Provider} from 'react-redux';
import Home from './pages/home';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
