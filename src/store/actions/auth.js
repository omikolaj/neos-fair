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

export const loginGithub = (auth) => {
  localStorage.setItem('token', auth.token)
  localStorage.setItem('expirationDate', auth.expiresIn)
  localStorage.setItem('user_id', auth.id)
  return {
    type: actionTypes.LOGIN_GITHUB,
    token: auth.token,    
    userID: auth.id   
  }
}

export const loginGithubFail = (error) => {
  return {
    type: actionTypes.LOGIN_GITHUB_FAIL,
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
        dispatch(authSuccess({token: token, userID: userID}))
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
    userInfo.map((userInputField, index) => {
      // if(userInputField.id === 'name'){
      //   userData['first_name'] = userInfo[index].config.value
      // }else if(userInputField.id === 'lastName'){
      //   userData['last_name'] = userInfo[index].config.value
      // }else{
        userData[userInputField.id] = userInfo[index].config.value
      // }      
    }
  );
  return {
    user: userData
  }
}

// Async

export const auth = (userInfo, isSignUp) =>{
  const userData = formatData(userInfo, isSignUp);
  return dispatch => {
    dispatch(authStart());
    let url = '/api/login';
    if(isSignUp){
      url = '/api/users'
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
        localStorage.setItem("token", auth.token)
        localStorage.setItem("user_id", auth.userID)         
        localStorage.setItem("expirationDate", expirationDate)
        dispatch(authSuccess(auth))
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

export const initLoginGithub = () => {
  return dispatch => {
    window.location.href="https://github.com/login/oauth/authorize?client_id=67cb7ac47afbb2aad88e&scope=user"
  }
}

export const loginAsGuest = () => {
  return dispatch => {
    dispatch(authStart());
    fetch('/api/guest', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(resp=>resp.json())
    .then(auth=>{
      if(auth.status >=200 && auth.status <300){
        const expirationDate = new Date(new Date().getTime() + auth.expiresIn * 1000); 
        localStorage.setItem("token", auth.token)
        localStorage.setItem("user_id", auth.userID)         
        localStorage.setItem("expirationDate", expirationDate)
        dispatch(authSuccess(auth))
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

