import {combineReducers, Reducer} from 'redux';
import authReducer from './feature/auth/slice';
import dialogReducer from './feature/dialog/slice';
import userReducer from './feature/user/slice';
import {RootState} from './store';

export const combinedReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  dialog: dialogReducer,
});

const rootReducer: Reducer<RootState> = (state, action) => {
  return combinedReducer(state, action);
};

export default rootReducer;
