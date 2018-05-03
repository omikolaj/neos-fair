import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout/Layout'

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route />
        </Switch>
      </Layout>
    );
  }
}

export default App;
