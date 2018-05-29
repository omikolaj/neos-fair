import React, { Component } from 'react';
import {Route, Switch, withRouter, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import Layout from './hoc/Layout/Layout';
import classes from './App.css';
import Ads from './containers/Ads/Ads';
import AdDetails from './containers/AdDetails/AdDetails';
import AdBuilder from './containers/AdBuilder/AdBuilder';
import * as actions from './store/actions/index';
import Logout from './containers/Auth/Logout/Logout';
import Welcome from './components/Welcome/Welcome';
import Account from './containers/Account/Account';
import { getQueryParams } from './store/utility';

class App extends Component {  
  
  componentDidMount(){
    this.props.onTryAutoAuth();
    const githubParams = getQueryParams()
    if(githubParams){
      if(githubParams.token){
        const expirationDate = new Date(new Date().getTime() + githubParams.expiresIn * 1000);   
        this.props.authSuccess({token: githubParams.token, userID: githubParams.id, expirationDate: expirationDate})
      }
      else{
        this.props.authFail(githubParams)
      }
    }   
  }

  componentDidUpdate(){    
    getQueryParams()
  }

  render() {

    let routes = (
      <Switch>                    
        <Route exact path='/' component={Welcome} />         
        <Redirect to="/" />     
      </Switch>
    );

    if(this.props.isAuthenticated){
      routes = (
        <Switch>
        <Route exact path='/ads/new' component={AdBuilder} />                  
        <Route exact path='/ads' component={Ads} />
        <Route exact path='/ads/:id' component={AdDetails} />
        <Route exact path='/users/:id' component={Account} />
        <Route exact path='/logout' component={Logout} />
        <Redirect to='/ads' />
      </Switch>
      )
    }    

    return (
      <div>
        <Layout>
          {routes}         
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token != null,
    userID: state.auth.userID
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoAuth: () => dispatch(actions.authCheckState()),
    authSuccess: (data) => dispatch(actions.authSuccess(data)),
    authFail: (error) => (dispatch(actions.authFail(error)))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
