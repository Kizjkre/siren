import { createContext, createSignal, useContext } from 'solid-js';
import { INITIAL_STATE } from '../constants/state';

const Context = createContext(INITIAL_STATE);

export const Provider = props => {
  const [state, setState] = createSignal(INITIAL_STATE);
  const value = [
    state,
    {
      toggleSidebar: () => setState(s => ({ ...s, sidebar: !s.sidebar }))
    },
  ];

  return (
    <Context.Provider value={ value }>
      { props.children }
    </Context.Provider>
  )
};

export const useState = () => useContext(Context);
