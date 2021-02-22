import {
  UPLOAD_FILE,
  ADD_TRACK,
  SET_SETTINGS,
  SET_GLOBAL_SETTINGS, FOCUS_WINDOW, DELETE_TRACK, INITIAL_STATE, INITIAL_SETTINGS, SET_DATA
} from '../constants/state';
import globalSettingsReducer from './globalSettings';

const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPLOAD_FILE:
      return Object.assign({}, state, {
        files: [...state.files, action.payload]
      });
    case ADD_TRACK:
      return Object.assign({}, state, {
        tracks: [...state.tracks, { ...action.payload, settings: { ...INITIAL_SETTINGS }, id: state.tracks.length }],
      });
    case SET_SETTINGS:
      return Object.assign({}, state, {
        tracks: state.tracks.map(t => action.payload.id === t.id ? { ...t, settings: { ...t.settings, ...action.payload.settings } } : t)
      });
    case SET_GLOBAL_SETTINGS:
      return Object.assign({}, state, {
        globalSettings: globalSettingsReducer(state.globalSettings, action)
      });
    case FOCUS_WINDOW:
      const focusIndex = state.windows.indexOf(action.payload);
      if (focusIndex >= 0) {
        return Object.assign({}, state, {
          windows: [action.payload, ...state.windows.slice(0, focusIndex), ...state.windows.slice(focusIndex + 1, state.windows.length)]
        });
      }
      return Object.assign({}, state, {
        windows: [action.payload, ...state.windows]
      });
    case DELETE_TRACK:
      let i = 0;
      for (const t of state.tracks) {
        if (action.payload === t.id) {
          break;
        }
        i++;
      }
      return Object.assign({}, state, {
        tracks: [...state.tracks.slice(0, i), ...state.tracks.slice(i + 1, state.tracks.length)],
      });
    case SET_DATA:
      return Object.assign({}, state, {
        tracks: state.tracks.map(t => {
          if (t.id !== action.payload.id) {
            return t;
          }
          return { ...t, data: action.payload.data };
        })
      });
    default:
      return state;
  }
};

export default rootReducer;
