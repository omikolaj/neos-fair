import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';


export const fetchNewAdStart = () => {
  return {
    type: actionTypes.FETCH_NEW_AD_START
  }
}

export const fetchNewAdSuccess = () => {
  return {
    type: actionTypes.FETCH_AD_SUCCESS
  }
} 

// Async code

export const fetchNewAd = () => {
  debugger
  return dispatch => {    
    dispatch(fetchNewAdStart())
    axios.post('/api/ads')
    .then(data => {
      debugger
    })
  }
}