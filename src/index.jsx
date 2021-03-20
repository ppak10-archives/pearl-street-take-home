/**
 * index.jsx
 * Entry file for react app.
 */

// Node Modules
import {render} from 'react-dom';

// Components
import App from './App';

// Provider
import Provider from './Provider';

render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
);
