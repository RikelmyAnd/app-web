import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as BroserRouter } from "react-router-dom";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BroserRouter>
      <App />
    </BroserRouter>
  </StrictMode>
)
