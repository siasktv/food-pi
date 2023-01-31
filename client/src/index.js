import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store/index';
import axios from "axios";

// axios.defaults.baseURL = "http://localhost:3001";

axios.defaults.baseURL = "https://food-pi-production-1489.up.railway.app";

ReactDOM.render(
  <Provider store= {store} >
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
