import React from 'react';
import App from './App';

import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";
import store from './redux/store'

const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <App />
      </div>
    </BrowserRouter>
  </Provider>,
  target
)
