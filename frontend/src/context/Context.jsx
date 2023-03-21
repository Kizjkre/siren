import { createContext, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import actions from '../constants/actions';
import { INITIAL_STATE } from '../constants/state';

const Context = createContext(INITIAL_STATE);

export const Provider = props => {
  const [state, setState] = createStore(INITIAL_STATE);

  return (
    <Context.Provider value={ [state, actions(setState)] }>
      { props.children }
    </Context.Provider>
  )
};

export const useState = () => useContext(Context);
