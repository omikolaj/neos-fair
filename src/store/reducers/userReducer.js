import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: null,
  userInfo: {}
};

const fetchUserInfoStart = (state, action) => {
  return {
    ...state,
    loading: true,
  }
}

const fetchUserInfoSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    error: null,
    userInfo: action.userInfo
  }
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.FETCH_USERINFO_START: return fetchUserInfoStart(state, action);
    case actionTypes.FETCH_USERINFO_SUCCESS: return fetchUserInfoSuccess(state, action);
    default: return state
  }
}

export default reducer;