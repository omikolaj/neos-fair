import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: null,
  error: null,
  userInfo: {
    name: '',
    username: '',
    email: ''
  }
};

const fetchUserInfoStart = (state, action) => {
  return {
    ...state,
    userInfo: {
      ...state.userInfo
    },
    loading: true,
  }
}

const fetchUserInfoSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    error: null,
    userInfo: {
      ...action.userInfo
    }
  }
}

const fetchUserInfoFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: {
      ...action.error,
    },
    userInfo: {}    
  }
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.FETCH_USERINFO_START: return fetchUserInfoStart(state, action);
    case actionTypes.FETCH_USERINFO_SUCCESS: return fetchUserInfoSuccess(state, action);
    case actionTypes.FETCH_USERINFO_FAIL: return fetchUserInfoFail(state, action);
    default: return state
  }
}

export default reducer;