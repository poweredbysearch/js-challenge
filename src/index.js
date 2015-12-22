import React from 'react';
import { render } from 'react-dom';
import createStore from './redux/create';
import reducers from './redux/reducers';
import { Provider } from 'react-redux';
import App from './App.jsx';

const store = createStore(reducers);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
