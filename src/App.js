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

class App extends Component {  
  componentDidMount(){
    this.props.onTryAutoAuth();
  }

  render() {

    let routes = (
      <Switch>                    
        <Route exact path='/ads' component={Ads} />
        <Route exact path='/ads/:id' component={AdDetails} />  
        <Route exact path='/' component={Welcome} />  
        <Redirect to="/" />     
      </Switch>
    );

    if(this.props.isAuthenticated){
      routes = (
        <Switch>
        <Route exact path='/ads/new' component={AdBuilder} />                  
        <Route exact path='/ads' component={Ads} />
        <Route exact path='/logout' component={Logout} />
        <Redirect to="/" />
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
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoAuth: () => dispatch(actions.authCheckState())
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
