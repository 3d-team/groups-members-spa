import {combineReducers, Reducer} from 'redux';
import authReducer from './feature/auth/slice';
import userReducer from './feature/user/slice';
import {RootState} from './store';

export const combinedReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

const rootReducer: Reducer<RootState> = (state, action) => {
  return combinedReducer(state, action);
};

export default rootReducer;
