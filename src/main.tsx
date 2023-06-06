import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import './index.css';
import type { API_SCORM_1_2, API_SCORM_2004 } from './types/ScormAPIs';
import { ScormAPI_1_2, ScormAPI_2004 } from './services/ScormAPIs';

declare global {
  interface Window {
    API: API_SCORM_1_2;
    API_1484_11: API_SCORM_2004;
  }
}

window.API = ScormAPI_1_2;
window.API_1484_11 = ScormAPI_2004;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
