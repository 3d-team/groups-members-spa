import {configureStore} from '@reduxjs/toolkit';
import rootReducer, {combinedReducer} from './root_reducer';
const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof combinedReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
