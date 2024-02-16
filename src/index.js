import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//importamos bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

const RootComponent = () =>(
  <React.StrictMode>
    <App />
  </React.StrictMode>
  
);

root.render(<RootComponent />);


reportWebVitals();
