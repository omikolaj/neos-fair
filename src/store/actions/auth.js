import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (data) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: data.token,
    userID: data.userID
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  }
}

export const

// Async

export const auth = (username, password, isSignUp) =>{
  return dispatch => {
    dispatch(authStart());
    const userData = {
      username: username,
      password: password
    }
    let url = '/api/users/login';
    if(!isSignUp){
      url = '/api/users/signup'
    }
    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(resp=>resp.json())
    .then(auth => {
      if(auth.status >=200 && auth.status < 300){
        dispatch(authSuccess(auth))
      }else{
        return Promise.reject(auth)
      }       
      
    })
    .catch(err => {
      debugger
      dispatch(authFail(err))
    })
  }
}