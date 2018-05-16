import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import Layout from './hoc/Layout/Layout';
import classes from './App.css';
import Ads from './containers/Ads/Ads';
import AdDetails from './containers/AdDetails/AdDetails';
import AdBuilder from './containers/AdBuilder/AdBuilder';
import Auth from './containers/Auth/Auth';
import * as actions from './store/actions/index';

class App extends Component {  
  componentDidMount(){
    this.props.onTryAutoAuth();
  }

  render() {
    return (
      <div>
        <Layout isAuthenticated={this.props.isAuthenticated}>
          <Switch>
            <Route exact path='/ads/new' component={AdBuilder} />
            <Route exact path='/ads/:id' component={AdDetails} />            
            <Route exact path='/ads' component={Ads} />    
            <Route exact path='/' component={Auth} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoAuth: () => dispatch(actions.authCheckState()),
    onLogout: () => dispatch(actions.logout())
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
