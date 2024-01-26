import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './i18n';
import { Suspense } from 'react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Suspense fallback="loading">
    <App />
  </Suspense>
);
