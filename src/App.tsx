import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import AppState from './redux/store';
import RootRouterProvider from './routes';

function App() {
  return (
    <Provider store={AppState.store}>
      <PersistGate persistor={AppState.persistor}>
        <RootRouterProvider />
      </PersistGate>
    </Provider>
  );
}

export default App;
