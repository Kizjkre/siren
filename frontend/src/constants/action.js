import halfmoon from 'halfmoon';

export const UPLOAD_FILE = 'UPLOAD_FILE';
export const ADD_TRACK = 'ADD_TRACK';
export const ADJUST_SETTINGS = 'ADJUST_SETTINGS';
export const ADJUST_GLOBAL_SETTINGS = 'ADJUST_GLOBAL_SETTINGS';
export const FOCUS_WINDOW = 'FOCUS_WINDOW';
export const DELETE_TRACK = 'DELETE_TRACK';

export const INITIAL_STATE = {
  files: [],
  tracks: [],
  settings: [],
  globalSettings: {
    bpm: 120,
    key: 'C',
    timesig: [4, 4],
    dark: halfmoon.getPreferredMode() === 'dark-mode',
    channels: 0
  },
  windows: []
};

export const INITIAL_SETTINGS = {
  mute: false,
  volume: 100,
  pan: 0,
  continuous: false,
  channel: [],
  selected: []
};
