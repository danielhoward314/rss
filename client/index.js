import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import theme from './util/themeConfig';
import store from './store';
import App from './components/App';
const rootEl = document.getElementById('root');

ReactDOM.render(
  <ThemeProvider theme={theme} >
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>, rootEl
  );
