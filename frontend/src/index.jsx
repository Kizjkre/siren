/* @refresh reload */
import { render } from 'solid-js/web';
import App from './App';

import './styles/index.css';
import { INITIAL_STATE } from './constants/state';
import { Provider } from './context/Context';

render(() => (
  <Provider>
    <App />
  </Provider>
), document.getElementById('root'));
