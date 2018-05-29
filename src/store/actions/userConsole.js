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

export const removeUserAdStart = () => {
  return {
    type: actionTypes.REMOVE_USER_AD_START
  }
}

export const removeUserAdSuccess = (resp) => {
  return {
    type: actionTypes.REMOVE_USER_AD_SUCCESS,
    targetAd: resp.removed_ad_id
  }
}

export const removeUserAdFail = (error) => {
  return {
    type: actionTypes.REMOVE_USER_AD_FAIL,
    error: error
  }
}

export const changeAdStatusStart = () => {
  return {
    type: actionTypes.CHANGE_AD_STATUS_START
  }
}

export const changeAdStatusSuccess = (resp) => {
  return {
    type: actionTypes.CHANGE_AD_STATUS_SUCCESS,
    ad: resp.ad
  }
}

export const changeAdStatusFail = (error) => {
  return {
    type: actionTypes.CHANGE_AD_STATUS_FAIL,
    error: error
  }
}

export const clearUpdatedAdID = () => {
  return {
    type: actionTypes.CLEAR_UPDATED_AD_ID
  }
}

// Async

export const changeAdStatus = (userID, adID) => {
  return dispatch => {
    dispatch(changeAdStatusStart())
    fetch(`/api/users/${userID}/ads/${adID}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(resp=>resp.json())
    .then(data=> {
      if(data.status >=200 && data.status < 300){
        dispatch(changeAdStatusSuccess(data))
      }else{
        return Promise.reject(data)
      }
    })
    .catch(error=>{
      dispatch(changeAdStatusFail(error))
    })
  }
}

export const removeUserAd = (userID, adID) => {
  return dispatch => {
    dispatch(removeUserAdStart())
    fetch(`/api/users/${userID}/ads/${adID}`,{
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(resp=>resp.json())
    .then(data => {
      if(data.status >=200 && data.status < 300){
        dispatch(removeUserAdSuccess(data))
      }else{
        return Promise.reject(data)
      }
    })
    .catch(error=>{
      dispatch(removeUserAdFail(error))
    })
  }
}

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