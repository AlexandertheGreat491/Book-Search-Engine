// imports react
import React from 'react';
// imports react-dom
import ReactDOM from 'react-dom';
// imports the minified bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// imports the css
import './index.css';
// imports the web vitals
import reportWebVitals from './reportWebVitals';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();