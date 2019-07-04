import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

// Import {history} and store
import store, { history } from './store';

// Import root scene
import App from './App';

// Import assets
import './global.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

// Import register service worker
import registerServiceWorker from './registerServiceWorker';

const target = document.querySelector('#root');

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  target
);
registerServiceWorker();