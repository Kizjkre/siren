import { ActionType, INITIAL_SETTINGS } from '../constants/state';

const workstationReducer = (state, action) => {
  switch (action.type.type) {
    case ActionType.UPLOAD_FILE.type:
      return Object.assign({}, state, {
        files: [...state.files, action.payload]
      });
    case ActionType.CREATE_TRACK.type:
      return Object.assign({}, state, {
        tracks: [...state.tracks, { ...action.payload, settings: { ...INITIAL_SETTINGS }, id: state.tracks[state.tracks.length - 1]?.id + 1 || 0 }],
      });
    case ActionType.EDIT_TRACK.type:
      return Object.assign({}, state, {
        tracks: state.tracks.map(t => action.payload.id === t.id ? { ...t, settings: { ...t.settings, ...action.payload.settings } } : t)
      });
    case ActionType.DELETE_TRACK.type:
      const tracks = Object.assign([], state.tracks);
      tracks.splice(state.tracks.findIndex(track => track.id === action.payload), 1);
      return Object.assign({}, state, { tracks });
    case ActionType.SET_SETTINGS.type:
      return Object.assign({}, state, {
        settings: {
          ...state.settings,
          ...action.payload
        }
      });
    default:
      return state;
  }
};

export default workstationReducer;
