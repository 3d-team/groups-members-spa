import {combineReducers, Reducer} from 'redux';
import authReducer from './feature/auth/slice';
import classReducer from './feature/class/slice';
import dialogReducer from './feature/dialog/slice';
import userReducer from './feature/user/slice';
import {RootState} from './store';

export const combinedReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  dialog: dialogReducer,
  class: classReducer,
});

const rootReducer: Reducer<RootState> = (state, action) => {
  return combinedReducer(state, action);
};

export default rootReducer;
