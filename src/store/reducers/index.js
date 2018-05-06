import { combineReducers } from 'redux';
import adsReducer from './adsReducer';
import adBuilderReducer from './adBuilderReducer';

const rootReducer = combineReducers({
  ads: adsReducer,
  adBuilder: adBuilderReducer
})

export default rootReducer;
