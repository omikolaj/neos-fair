import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: null,
  userAds: [],
  userOrders: []
}

const fetchUserAdsStart = (state, action) => {
  return {
    loading: true,
    error: null,
    userAds: [
      ...state.userAds
    ],
    userOrders: [
      ...state.userOrders
    ]
  }
}

const fetchUserAdsSuccess = (state, action) => {
  return {
    loading: false,
    error: null,
    userAds: [
      ...action.userAds
    ],
    userOrders: [
      ...state.userOrders
    ]
  }
}

const fetchUserAdsFail = (state, action) => {
  return {
    loading: false,
    error: {
      ...action.error
    },
    userAds: [
      ...state.userAds
    ],
    userOrders: [
      ...state.userOrders
    ]
  }
}

const fetchUserOrdersStart = (state, action) => {
  return {
    loading: true,
    error: null,
    userAds: [
      ...state.userAds
    ],
    userOrders: [
      ...state.userOrders
    ]
  }
}

const fetchUserOrdersSuccess = (state, action) => {
  return {
    loading: false,
    error: null,
    userAds: [
      ...state.userAds
    ],
    userOrders: [
      ...action.userOrders
    ]
  }
}

const fetchUserOrdersFail = (state, action) => {
  return {
    loading: false,
    error: {
      ...action.error
    },
    userAds: [
      ...state.userAds
    ],
    userOrders: [
      ...state.userOrders
    ]
  }
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.FETCH_USER_ADS_START: return fetchUserAdsStart(state, action);
    case actionTypes.FETCH_USER_ADS_SUCCESS: return fetchUserAdsSuccess(state, action);
    case actionTypes.FETCH_USER_ADS_FAIL: return fetchUserAdsFail(state, action);
    case actionTypes.FETCH_USER_ORDERS_START: return fetchUserOrdersStart(state, action);
    case actionTypes.FETCH_USER_ORDERS_SUCCESS: return fetchUserOrdersSuccess(state, action);
    case actionTypes.FETCH_USER_ORDERS_FAIL: return fetchUserOrdersFail(state, action);
    default: return state;
  }
}

export default reducer;