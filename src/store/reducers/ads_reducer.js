import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
  ads: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ADS:
      return {
        ...state,
        ...action.ads
      }
      default:
        return state;
  }
}

export default reducer;