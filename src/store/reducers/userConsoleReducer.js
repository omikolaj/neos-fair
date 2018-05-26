import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: null,
  userAds: [],
  userOrders: [],
  updatedAdID: null
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
      ...action.userAds.ads
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
      ...action.userOrders.orders
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

const removeUserAdStart = (state, action) => {
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

const removeUserAdSuccess = (state, action) => {
  const currentUserAds = [...state.userAds]
  const updatedUserAds = currentUserAds.filter((ad) => ad.id !== action.targetAd)
  return {
    loading: false,
    error: null,
    userAds: [
      ...updatedUserAds
    ],
    userOrders: [
      ...state.userOrders
    ]
  }
}

const removeUserAdFail = (state, action) => {
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

const changeAdStatusStart = (state, action) => {
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

const changeAdStatusSuccess = (state, action) => {
  return {
    loading: false,
    error: null,
    userAds: state.userAds.map(ad=> ad.id === action.ad.id ? action.ad : ad),
    userOrders: [
      ...state.userOrders
    ],
    updatedAdID: action.ad.id
  }
}

const changeAdStatusFail = (state, action) => {
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
    case actionTypes.REMOVE_USER_AD_START: return removeUserAdStart(state, action);
    case actionTypes.REMOVE_USER_AD_SUCCESS: return removeUserAdSuccess(state, action);
    case actionTypes.REMOVE_USER_AD_FAIL: return removeUserAdFail(state, action);
    case actionTypes.CHANGE_AD_STATUS_START: return changeAdStatusStart(state, action);
    case actionTypes.CHANGE_AD_STATUS_SUCCESS: return changeAdStatusSuccess(state, action);
    case actionTypes.CHANGE_AD_STATUS_FAIL: return changeAdStatusFail(state, action);
    default: return state;
  }
}

export default reducer;