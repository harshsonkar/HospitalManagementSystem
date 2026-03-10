import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './contexts/authstate';
import DBprovider from './contexts/dbstate';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
  <React.StrictMode>
  <AuthProvider>
    <DBprovider>
      <Router>
        <App />
      </Router>
      </DBprovider>
    </AuthProvider>
  </React.StrictMode>
  </div>
);