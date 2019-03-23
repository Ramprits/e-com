import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom'
import { render } from 'react-dom';
import App from './containers/app';
import './style.css';



render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  , document.getElementById('root'));
