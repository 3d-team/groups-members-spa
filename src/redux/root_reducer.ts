import {combineReducers, Reducer} from 'redux';
import userReducer from './feature/user/slice';
import {RootState} from './store';

export const combinedReducer = combineReducers({
  user: userReducer,
});

const rootReducer: Reducer<RootState> = (state, action) => {
  return combinedReducer(state, action);
};

export default rootReducer;
