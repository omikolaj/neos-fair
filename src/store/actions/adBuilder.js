import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

export const createNewAdStart = () => {
  type: actionTypes.CREATE_NEW_AD_START
}

export const createNewAdSuccess = (resp) => {
  type: actionTypes.CREATE_NEW_AD_SUCCESS
  resp: resp
}

export const createNewAdFail = (error) => {
  type: actionTypes.CREATE_NEW_AD_FAIL
  payload: error
}

// Async code

export const createNewAd = (adData) => {
  return dispatch => {
    // dispatch(createNewAdStart())
    fetch('/api/ads', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(adData)
    })
    .then(req=>req.json())
    .then(resp=> {
      dispatch(createNewAdSuccess(resp))
    })
    .catch(error=>{
      dispatch(createNewAdFail(error))
    })
  }  
}