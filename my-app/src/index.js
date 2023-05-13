// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { Layout } from 'antd';
// import 'antd/dist/reset.css';
// import { Switch } from 'react-router-dom';


// const rootElement = document.getElementById('root');

// ReactDOM.createRoot(rootElement).render(
//   <Router>
//     <Routes>
//     <Route exact path="/" component={App} />
//     </Routes>
//   </Router>
// );

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import App2 from './App2';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/reset.css';
import { Switch } from 'react-router-dom';

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

// ReactDOM.render(
//   <Router>
//     <Layout>
//     <Routes>
//         <Route exact path="/" component={App} />
//         {/* Добавьте другие маршруты здесь */}
//         </Routes>
//     </Layout>
//   </Router>,
//   document.getElementById('root')
// );

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
  
//     <App />
  
//   </React.StrictMode>
// );



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
