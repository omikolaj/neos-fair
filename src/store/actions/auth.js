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

export const logout = () => {
  return {
    type: actionTypes.LOGOUT
  }
}

// Async

export const checkExpirationTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {  
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

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
        dispatch(checkExpirationTimeout(auth.expiresIn))
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