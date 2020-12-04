import { UPLOAD_FILE, SELECT_COLUMN, ADD_TRACK, ADJUST_SETTINGS } from '../constants/action-types';

const initialState = {
  files: [],
  columns: [],
  tracks: [],
  settings: []
};

const initialSettings = {
  mute: false,
  volume: 50
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
        tracks: [...state.tracks, action.payload],
        settings: [...state.settings, { i: state.settings.length, settings: { ...initialSettings } }]
      });
    case ADJUST_SETTINGS:
      return Object.assign({}, state, {
        settings: state.settings.map(({ i, settings }) => {
          if (action.payload.i === i) {
            return ({
              i,
              settings: action.payload.settings
            });
          }
          return ({ i, settings });
        })
      });
    default:
      return state;
  }
};

export default rootReducer;