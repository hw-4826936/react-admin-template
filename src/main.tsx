import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './styles/global.scss';
import './locales'; // 初始化 i18n

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
