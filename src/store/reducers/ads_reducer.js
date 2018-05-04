import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';
import cuid from 'cuid';

const initialState = {
  ads: [],
  loading: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ADS_SUCCESS:
      const updatedAds = []
      action.ads.map(ad => {
        updatedAds.push({
          ...ad,
          id: cuid()
        })
      })
      return {
        ...state,
        ads: [
          ...updatedAds
        ],
        loading: false        
      }
    case actionTypes.FETCH_ADS_START:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}

export default reducer;