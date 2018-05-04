import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchAdsSuccess = (ads) => {
  return {
    type: actionTypes.FETCH_ADS_SUCCESS,
    ads: ads
  }
}

export const fetchAdsStart = () => {
  return {
    type: actionTypes.FETCH_ADS_START    
  }
}

// Async calls

export const fetchAds = () => {
  return dispatch => {
    dispatch(fetchAdsStart())
    fetch('/api/ads')
    .then(resp=>resp.json())
    .then(data =>
      dispatch(fetchAdsSuccess(data))
    )
  }
}
