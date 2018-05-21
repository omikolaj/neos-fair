import * as actionTypes from '../actions/actionTypes';
import { FETCH_USERINFO_FAIL } from '../actions/actionTypes';

export const fetchUserInfoStart = () => {
  return {
    type: actionTypes.FETCH_USERINFO_START
  }
}

export const fetchUserInfoSuccess = (userData) => {
  return {
    type: actionTypes.FETCH_USERINFO_SUCCESS,
    userInfo: userData.userInfo
  }
}

export const fetchUserInfoFail = (error) => {
  return {
    type: actionTypes.FETCH_USERINFO_FAIL,
    error: error
  }
}

// Async

export const fetchUserInfo = (userID) => {
  return dispatch => {
    dispatch(fetchUserInfoStart())
    fetch('/api/users/' + userID)
    .then(resp=>resp.json())
    .then(userData => {
      if(userData.status >= 200 && userData.status < 300){
        dispatch(fetchUserInfoSuccess(userData))
      }
      else{        
        return Promise.reject(userData)
      }     
    })
    .catch(error=>{
      dispatch(fetchUserInfoFail(error))
    })
  } 
}