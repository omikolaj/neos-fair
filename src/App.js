import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import classes from './App.css';
import Ads from './containers/Ads/Ads';
import AdDetails from './containers/AdDetails/AdDetails';
import AdBuilder from './containers/AdBuilder/AdBuilder';
import Auth from './containers/Auth/Auth';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
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

export default App;
