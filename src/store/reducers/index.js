import { combineReducers } from 'redux';
import adsReducer from './adsReducer';
import adBuilderReducer from './adBuilderReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  ads: adsReducer,
  adBuilder: adBuilderReducer,
  auth: authReducer,
  userInfo: userReducer
})

export default rootReducer;
