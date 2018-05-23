import * as actionTypes from '../actions/actionTypes';

export const fetchUserAdsStart = () => {
  return {
    type: actionTypes.FETCH_USER_ADS_START
  }
}

export const fetchUserAdsSuccess = (userAds) => {
  return {
    type: actionTypes.FETCH_USER_ADS_SUCCESS,
    userAds: userAds
  }
}

export const fetchUserAdsFail = (error) => {
  return {
    type: actionTypes.FETCH_USER_ADS_FAIL,
    error: error
  }
} 

export const fetchUserOrdersStart = () => {
  return {
    type: actionTypes.FETCH_USER_ORDERS_START
  }
}

export const fetchUserOrdersSuccess = (userOrders) => {
  return {
    type: actionTypes.FETCH_USER_ORDERS_SUCCESS,
    userOrders: userOrders,
  }
}

export const fetchUserOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_USER_ADS_FAIL,
    error: error
  }
}

// Async

export const fetchUserAds = (userID) => {
  return dispatch => {
    dispatch(fetchUserAdsStart())
    fetch(`/api/users/${userID}/ads`)
    .then(resp=>resp.json())
    .then(userAds => {
      if(userAds.status >= 200 && userAds.status < 300){
        dispatch(fetchUserAdsSuccess(userAds))
      }else{
        return Promise.reject(userAds)
      }
    })
    .catch(error=> {
      dispatch(fetchUserAdsFail(error))
    })
  }
}

export const fetchUserOrders = (userID) => {
  return dispatch => {
    dispatch(fetchUserOrdersStart())
    fetch(`/api/users/${userID}/orders`)
    .then(resp=>resp.json())
    .then(userOrders => {
      if(userOrders.status >= 200 && userOrders.status < 300){
        dispatch(fetchUserOrdersSuccess(userOrders))
      }else{
        return Promise.reject(userOrders)
      }
    })
    .catch(error=> {
      dispatch(fetchUserOrdersFail(error))
    })
  }
}