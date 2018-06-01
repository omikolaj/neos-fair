import * as actionTypes from './actionTypes';

const API_HOST = process.env.REACT_APP_API_HOST
const GITHUB_REDIRECT = process.env.REACT_APP_GITHUB

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (data) => {
  localStorage.setItem('token', data.token)
  localStorage.setItem('expirationDate', data.expirationDate)
  localStorage.setItem('user_id', data.userID)
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: data.token,
    userID: data.userID
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('user_id');
  return {
    type: actionTypes.LOGOUT
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token")    
    if(!token){
      dispatch(logout());
    }else{
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if(expirationDate <= new Date()){
        dispatch(logout());  
      } else {
        const userID = localStorage.getItem('user_id')
        dispatch(authSuccess({token: token, userID: userID, expirationDate: expirationDate}))
        dispatch(checkExpirationTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }      
    }
  }
}

export const checkExpirationTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {  
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

const formatData = (userInfo, isSignUp) => {
  let userData = {};
  if(isSignUp === "guest"){
    return
  }else{
      userInfo.map((userInputField, index) => {
          userData[userInputField.id] = userInfo[index].config.value      
      }
    );
  }
  return {
    user: userData
  }
}

export const initLoginGithub = () => {
  return dispatch => {
    window.location.href= GITHUB_REDIRECT;
  }
}

// Async

export const auth = (userInfo, isSignUp) =>{
  const userData = formatData(userInfo, isSignUp);
  return dispatch => {
    dispatch(authStart());
    let url = `${API_HOST}/login`;
    if(isSignUp){
      if(isSignUp === "guest"){
        url = `${API_HOST}/guest`
      }else{
        url = `${API_HOST}/users`
      }     
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
        const expirationDate = new Date(new Date().getTime() + auth.expiresIn * 1000);       
        dispatch(authSuccess({token: auth.token, userID: auth.userID, expirationDate: expirationDate}))
        dispatch(checkExpirationTimeout(auth.expiresIn))
      }else{
        return Promise.reject(auth)
      }      
    })
    .catch(err => {
      dispatch(authFail(err))
    })
  }
}