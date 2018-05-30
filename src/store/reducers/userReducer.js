import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: null,
  error: null,
  userInfo: {
    name: '',
    username: '',
    email: '',
    wallet: null
  },
  info: '',
  unauthorized: false,
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
    userInfo: {}    ,
    unauthorized: action.error.unauthorized
  }
}

const updateUserInfoStart = (state, action) => {
  return {
    ...state,
    loading: true,    
  }
}

const updateUserInfoSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    error: null,
    userInfo: {
      ...action.userInfo
    },
    info: action.resp.success
  }
}

const updateUserInfoFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: {
      ...action.error
    }
  }
}

const rechargeAccountStart = (state, action) => {
  return {
    ...state,
    userInfo: {
      ...state.userInfo
    },
  }
}

const rechargeAccountSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    error: null,
    userInfo: {
      ...state.userInfo,
      wallet: action.wallet
    },
    info: action.resp,
  }
}

const rechargeAccountFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: {
      ...action.error
    }
  }
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.FETCH_USERINFO_START: return fetchUserInfoStart(state, action);
    case actionTypes.FETCH_USERINFO_SUCCESS: return fetchUserInfoSuccess(state, action);
    case actionTypes.FETCH_USERINFO_FAIL: return fetchUserInfoFail(state, action);
    case actionTypes.UPDATE_USER_INFO_START: return updateUserInfoStart(state, action);
    case actionTypes.UPDATE_USER_INFO_SUCCESS: return updateUserInfoSuccess(state, action);
    case actionTypes.UPDATE_USER_INFO_FAIL: return updateUserInfoFail(state, action);
    case actionTypes.RECHARGE_ACCOUNT_START: return rechargeAccountStart(state, action);
    case actionTypes.RECHARGE_ACCOUNT_SUCCESS: return rechargeAccountSuccess(state, action);
    case actionTypes.RECHARGE_ACCOUNT_FAIL: return rechargeAccountFail(state, action);
    default: return state
  }
}

export default reducer;