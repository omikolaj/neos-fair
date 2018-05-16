import { combineReducers } from 'redux';
import adsReducer from './adsReducer';
import adBuilderReducer from './adBuilderReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  ads: adsReducer,
  adBuilder: adBuilderReducer,
  auth: authReducer
})

export default rootReducer;
