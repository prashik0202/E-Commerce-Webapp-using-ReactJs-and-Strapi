import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { theme } from './theme';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CartReducer from './state';
import { BrowserRouter } from 'react-router-dom';

const store = configureStore({ 
  reducer : { cart : CartReducer }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
          <BrowserRouter>
            <App />
          </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);


