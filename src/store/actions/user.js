import * as actionTypes from '../actions/actionTypes';
import {getToken} from '../utility';

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

export const rechargeAccountStart = () => {
  return {
    type: actionTypes.RECHARGE_ACCOUNT_START
  }
}

export const rechargeAccountSuccess = (data) => {
  return {
    type: actionTypes.RECHARGE_ACCOUNT_SUCCESS,
    resp: data.success,
    wallet: data.wallet
  }
}

export const rechargeAccountFail = (error) => {
  return {
    type: actionTypes.RECHARGE_ACCOUNT_FAIL,
    error: error
  }
}

const rechargeAmount = () => {
  return Math.floor(Math.random() * (1000 - 10 + 1)) + 10;
}

// Async

export const rechargeAccount = (userID) => {  
  const rechargeTotal = {recharge: rechargeAmount()}
  return dispatch => {
    dispatch(rechargeAccountStart())
    fetch('/api/users/' + userID, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(rechargeTotal)
    })
    .then(resp=>resp.json())
    .then(data => {
      if(data.status >= 200 && data.status < 300){
        dispatch(rechargeAccountSuccess(data))
      }
      else{
        return Promise.reject(data)
      }
    })
    .catch(error => {
      dispatch(rechargeAccountFail(error))
    })
  }
}

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
  const token = getToken();
  return dispatch => {
    dispatch(fetchUserInfoStart())
    fetch(`/api/users/${userID}?auth=${token}`)
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