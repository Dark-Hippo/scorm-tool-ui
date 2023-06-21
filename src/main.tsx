import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import './index.css';
import type { API_SCORM_1_2, API_SCORM_2004 } from './types/ScormAPIs';
import { ScormAPI_1_2, ScormAPI_2004 } from './services/ScormAPIs';
import { Auth0Provider } from '@auth0/auth0-react';

declare global {
  interface Window {
    API: API_SCORM_1_2;
    API_1484_11: API_SCORM_2004;
  }
}

window.API = ScormAPI_1_2;
window.API_1484_11 = ScormAPI_2004;

const test = import.meta.env.REACT_APP_AUTH_TEST;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH_DOMAIN}
      clientId={import.meta.env.VITE_AUTH_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);
