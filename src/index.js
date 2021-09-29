import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import AppRouter from './Routers/AppRouter'
import {store} from './Store/store'

ReactDOM.render(
    <Provider store={store}>
      <AppRouter/>
    </Provider>,
  document.getElementById('root')
);
