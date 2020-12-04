import { UPLOAD_FILE, SELECT_COLUMN, ADD_TRACK, ADJUST_SETTINGS } from '../constants/action-types';

const initialState = {
  files: [],
  columns: [],
  tracks: [],
  settings: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_FILE:
      return Object.assign({}, state, {
        files: [...state.files, action.payload]
      });
    case SELECT_COLUMN:
      return Object.assign({}, state, {
        columns: [...state.columns, action.payload]
      });
    case ADD_TRACK:
      return Object.assign({}, state, {
        tracks: [...state.tracks, action.payload]
      });
    case ADJUST_SETTINGS:
      const temp = Object.assign({}, state);
      temp.settings[action.payload.i] = {
        ...temp.settings[action.payload.i],
        ...action.payload.settings
      };
      return Object.assign({}, state, {
        settings: [...state.settings, action.payload]
      });
    default:
      return state;
  }
};

export default rootReducer;