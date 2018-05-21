import * as actionTypes from '../actions/actionTypes';

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

// Async

export const fetchUserInfo = (userID) => {
  return dispatch => {
    dispatch(fetchUserInfoStart())
    fetch('/api/users/' + userID)
    .then(resp=>resp.json())
    .then(userData => {
      dispatch(fetchUserInfoSuccess(userData))
    })
  }
}