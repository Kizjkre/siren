import { SET_GLOBAL_SETTINGS } from '../constants/state';

const globalSettingsReducer = (state, action) => {
  switch (action.type) {
    case SET_GLOBAL_SETTINGS:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};

export default globalSettingsReducer;
