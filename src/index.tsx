import React from 'react';
import ReactDOM from 'react-dom/client';

import { Auth0Provider } from '@auth0/auth0-react';

import './index.css';

import App from './App';

import AUTH0_CONFIG from './config';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <Auth0Provider
    domain={AUTH0_CONFIG.DOMAIN}
    clientId={AUTH0_CONFIG.CLIENT_ID}
    redirectUri={window.location.origin}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>,
);

reportWebVitals();
