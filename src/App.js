import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout/Layout'
import classes from './App.css'
import Ads from './containers/Ads/Ads'

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/ads" component={Ads}/>            
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
