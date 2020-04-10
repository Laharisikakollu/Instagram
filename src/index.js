import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import * as serviceWorker from './serviceWorker';
import reducer from './reducers/index';
import { createStore } from 'redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserHistory } from 'history';
// const store = createStore(reducer);
const history = createBrowserHistory();
ReactDOM.render(
    
      
     
      <App />
     
      
    
  ,
  document.getElementById('root')
);