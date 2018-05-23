import { combineReducers } from 'redux';
import adsReducer from './adsReducer';
import adBuilderReducer from './adBuilderReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';
import userConsoleReducer from './userConsoleReducer'

const rootReducer = combineReducers({
  ads: adsReducer,
  adBuilder: adBuilderReducer,
  auth: authReducer,
  userInfo: userReducer,
  userConsole: userConsoleReducer
})

export default rootReducer;
