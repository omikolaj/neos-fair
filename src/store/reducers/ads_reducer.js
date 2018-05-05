import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';
import cuid from 'cuid';

const initialState = {
  ads: [],
  loading: false,
}

const fetchAdsStart = (state, action) => {
  return {
    ...state,
    loading: true
  }
}

const fetchAdsSuccess = (state, action) => {
  return {ads: state.ads.concat(action.ads)}
}

const fetchAdsFail = (state, action) => {
  return {
    //...
  }
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.FETCH_ADS_START: return fetchAdsStart(state, action);
    case actionTypes.FETCH_ADS_SUCCESS: return fetchAdsSuccess(state, action);
    default: return state;
  }
}

export default reducer;