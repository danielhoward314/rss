import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import store from './store';
import themeConfig from './util/themeConfig';
import App from './components/App';
const rootEl = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={themeConfig} >
      <App />
    </ThemeProvider>
  </Provider>, rootEl
  );
