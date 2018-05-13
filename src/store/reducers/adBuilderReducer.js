import * as actionTypes from '../actions/actionTypes';

const initialState = {
  newAd: {
    loading: false,
    id: null,
    message: '',    
    validations: [],
    isNewAd: false,
    error: null,
  }  
}

const createNewAdStart = (state, action) => {
  return {
    newAd: {
      ...state.newAd,
      loading: true,
      validations: [
        ...state.newAd.validations
      ],
      isNewAd: true
    }
  }
}

const createNewAdSuccess = (state, action) => {
  return {
    newAd: {
      ...state.newAd,
      loading: false,    
      id: action.resp.id,
      message: action.resp.success,
    }    
  }
}

const createNewAdFail = (state, action) => {
  return {
    newAd: {
      ...state.newAd,
      loading: false,
      message: action.resp.fail,
      validations: [
        ...action.validations
      ],
      error: true
    }
  }
}

const setNewAdStale = (state, action) => {
  return {
    newAd: {
      ...state.newAd,
      validations: [
        ...state.newAd.validations
      ],
      isNewAd: false,
      error: null,
    }
  }
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.CREATE_NEW_AD_START: return createNewAdStart(state, action);
    case actionTypes.CREATE_NEW_AD_SUCCESS: return createNewAdSuccess(state, action);
    case actionTypes.CREATE_NEW_AD_FAIL: return createNewAdFail(state, action);
    case actionTypes.SET_NEW_AD_STALE: return setNewAdStale(state, action);
    default: return state; 
  } 
}

export default reducer;