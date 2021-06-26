import { ActionType } from '../constants/state';

const generalReducer = (state, action) => {
  switch (action.type.type) {
    case ActionType.CREATE_WINDOW.type:
      if (state.windows.findIndex(window => window.id === action.payload) >= 0) return state;
      return Object.assign({}, state, {
        windows: [...state.windows, { id: action.payload, zIndex: 0 }]
      });
    case ActionType.FOCUS_WINDOW.type:
      return Object.assign({}, state, {
        windows: state.windows.map(window => {
          if (window.id === action.payload) {
            return { ...window, zIndex: Math.max(...state.windows.map(w => w.zIndex)) + 1 };
          }
          return window;
        })
      });
    case ActionType.BLUR_WINDOW.type:
      return Object.assign({}, state, {
        windows: state.windows.map(window => {
          if (window.id === action.payload) {
            return { ...window, zIndex: 0 };
          }
          return window;
        })
      });
    case ActionType.SET_STATE.type:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};

export default generalReducer;
