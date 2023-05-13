import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import App2 from './App2';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'antd/dist/reset.css';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Router>
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route exact path="/about" element={<App2 />} />
    </Routes>
  </Router>,
  rootElement
);

reportWebVitals();
