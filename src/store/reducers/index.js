import { combineReducers } from 'redux';
import adsReducer from './ads_reducer'

const rootReducer = combineReducers({
  ads: adsReducer
})

export default rootReducer;
