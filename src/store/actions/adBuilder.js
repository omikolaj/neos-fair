import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

export const createNewAdStart = () => {
  return {
    type: actionTypes.CREATE_NEW_AD_START
  }  
}

export const createNewAdSuccess = (resp) => {
  return {
    type: actionTypes.CREATE_NEW_AD_SUCCESS,
    resp: resp
  }  
}

export const createNewAdFail = (error) => {
  return {
    type: actionTypes.CREATE_NEW_AD_FAIL,
    resp: error,
    validations: error.validations
  }  
}

export const setNewAdStale = () => {
  return {
    type: actionTypes.SET_NEW_AD_STALE
  }  
}

// Async code

export const createNewAd = (adData) => {
  return dispatch => {
    dispatch(createNewAdStart())
    fetch('/api/ads', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(adData)
    })
    .then(req=>req.json())
    .then(resp=> {
      if(resp.status >= 200 && resp.status < 300){
        dispatch(createNewAdSuccess(resp))
      }
      else{        
        return Promise.reject(resp)
      }     
    })
    .catch(error=>{
      dispatch(createNewAdFail(error))
    })
  }  
}
