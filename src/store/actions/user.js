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

export const updateUserInfoStart = () => {
  return {
    type: actionTypes.UPDATE_USER_INFO_START
  }
}

export const updateUserInfoSuccess = (resp) => {
  return {
    type: actionTypes.UPDATE_USER_INFO_SUCCESS,
    userInfo: resp.userInfo,
    resp: resp
  }
}

export const updateUserInfoFail = (error) => {
  return {
    type: actionTypes.UPDATE_USER_INFO_FAIL,
    error: error
  }
}


const formatData = (userInfo) => {
  let formattedUserInfo = {
    user: {}
  };
  userInfo.map(infoType => {
    formattedUserInfo.user[infoType.id] = infoType.value
  })
  return formattedUserInfo;
}

// Async

export const updateUserInfo = (userInfo) => {
  const userInfoFormatted = formatData(userInfo)
  return dispatch => {
    dispatch(updateUserInfoStart());
    fetch('/api/users/' + userInfoFormatted.user.id, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(userInfoFormatted)
    })
    .then(resp=>resp.json())
    .then(data => {
      if(data.status >= 200 && data.status < 300){
        dispatch(updateUserInfoSuccess(data))
      }
      else{
        return Promise.reject(data)
      }
    })
    .catch(error => {
      dispatch(updateUserInfoFail(error))
    })
  }
}

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