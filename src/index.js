import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//import reducer1 from ''
//import reducer2 from ''

const rootReducer = combineReducers({
  red1: 'reducer1',
  red2: 'reducer2'
})

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
