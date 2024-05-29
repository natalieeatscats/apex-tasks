import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { store } from './api/store/store.ts';
import { Provider } from 'react-redux';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import ru from 'javascript-time-ago/locale/ru';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
