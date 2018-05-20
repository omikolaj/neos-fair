import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, withRouter, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import Layout from './hoc/Layout/Layout';
import classes from './App.css';
import Ads from './containers/Ads/Ads';
import AdDetails from './containers/AdDetails/AdDetails';
import AdBuilder from './containers/AdBuilder/AdBuilder';
import Auth from './containers/Auth/Auth';
import * as actions from './store/actions/index';
import Logout from './containers/Auth/Logout/Logout';
import Welcome from './containers/Welcome/Welcome';
import Account from './containers/Account/Account';
import { getQueryParams } from './store/utility';

class App extends Component {  
  componentDidMount(){
    this.props.onTryAutoAuth();
    const githubParams = getQueryParams()
    if(githubParams){
      if(githubParams.token)
        this.props.loginGithub(githubParams)
      else{
        this.props.loginGIthubFail(githubParams)
      }
    }   
  }

  componentDidUpdate(){    
    const paramsArray = getQueryParams()
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
    loginGithub: (auth) => dispatch(actions.loginGithub(auth)),
    loginGIthubFail: (error) => dispatch(actions.loginGithubFail(error))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
