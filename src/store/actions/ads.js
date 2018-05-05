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
    error: error
  }
}

export const fetchAdStart = () => {
  return {
    type: actionTypes.FETCH_AD_START
  }
}

// Async calls

export const fetchAd = (id) => {
  return dispatch => {
    dispatch(fetchAdStart())
    fetch(`/api/ads/${id}`)
    .then(resp=>resp.json())
    .then(data => {
      debugger
    })
  }
}

export const fetchAds = () => {
  return dispatch => {
    dispatch(fetchAdsStart())
    fetch('/api/ads')
    .then(resp=>resp.json())
    .then(data =>
      dispatch(fetchAdsSuccess(data))
    )
    .catch(error => {
      dispatch(fetchAdsFail(error))
    })
  }
}
