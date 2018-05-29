import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchAdsStart = () => {
  return {
    type: actionTypes.FETCH_ADS_START    
  }
}

export const fetchAdsSuccess = (ads) => {
  return {
    type: actionTypes.FETCH_ADS_SUCCESS,
    ads: ads
  }
}

export const fetchAdsFail = (error) => {
  return {
    type: actionTypes.FETCH_AD_FAIL,
    payload: error
  }
}

export const fetchAdStart = () => {
  return {
    type: actionTypes.FETCH_AD_START
  }
}

export const fetchAdSuccess = (ad) => {
  return {
    type: actionTypes.FETCH_AD_SUCCESS,
    ad: ad
  }
}

export const fetchAdFail = (error) => {
  return {
    type: actionTypes.FETCH_AD_FAIL,
    payload: error
  }
}

export const payForItemStart = () => {
  return {
    type: actionTypes.PAY_FOR_ITEM_START
  }
}

export const payForItemSuccess = (payload) => {
  return {
    type: actionTypes.PAY_FOR_ITEM_SUCCESS,
    resp: payload
  }
}

export const payForItemFail = (error) => {
  return {
    type: actionTypes.PAY_FOR_ITEM_FAIL,
    error: error
  }
}

// Async calls

export const fetchAd = (id) => {
  return dispatch => {
    dispatch(fetchAdStart())
    fetch(`/api/ads/${id}`)
    .then(resp=>resp.json())
    .then(data => {
      dispatch(fetchAdSuccess(data))
    })
    .catch(error=>{
      dispatch(fetchAdFail(error))
    })
  }
}

export const fetchAds = (token) => {
  return dispatch => {
    dispatch(fetchAdsStart())
    fetch('/api/ads.json?auth='+ token)
    .then(resp=>resp.json())
    .then(data =>{
      dispatch(fetchAdsSuccess(data))
    })
    .catch(error => {
      dispatch(fetchAdsFail(error))
    })
  }
}

export const payForItem = (payData) => {
  return dispatch => {
    dispatch(payForItemStart());
    const data = {userID: payData.userID, adID: payData.adID, price: payData.price.substring(1)}    
    fetch(`/api/pay?userID=${data.userID}&adID=${data.adID}&price=${data.price}`, {
      method: 'POST',
      header: {
        'Accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(resp=>resp.json())
    .then(data=> {
      if(data.status >= 200 && data.status < 300){
        dispatch(payForItemSuccess(data))
      }
      else{        
        return Promise.reject(data)
      }     
    })
    .catch(error=>{
      dispatch(payForItemFail(error))
    })
  }
}
