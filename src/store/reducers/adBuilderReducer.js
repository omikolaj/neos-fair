import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: null
}

const createNewAdStart = (state, action) => {
  return {
    ...state.loading = true
  }
}

const createNewAdSuccess = (state, action) => {
  debugger
  return {
  }
}

const createNewAdFail = (state, action) => {
  debugger
  return {
    ...state.loading = false,
    ...state.error = action.payload.error
  }
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.CREATE_NEW_AD_START: return createNewAdStart(state, action);
    case actionTypes.CREATE_NEW_AD_SUCCESS: return createNewAdSuccess(state,action);
    case actionTypes.CREATE_NEW_AD_FAIL: return createNewAdFail(state, action);
    default: return state; 
  } 
}

export default reducer;