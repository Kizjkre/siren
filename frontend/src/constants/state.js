export const ActionType = Object.freeze({
  reducer: {
    WORKSTATION: 'WORKSTATION',
    EDITOR: 'EDITOR',
    GENERAL: 'GENERAL'
  },
  UPLOAD_FILE: { type: 'UPLOAD_FILE', reducer: 'WORKSTATION' },
  CREATE_TRACK: { type: 'CREATE_TRACK', reducer: 'WORKSTATION' },
  EDIT_TRACK: { type: 'EDIT_TRACK', reducer: 'WORKSTATION' },
  DELETE_TRACK: { type: 'DELETE_TRACK', reducer: 'WORKSTATION' },
  CREATE_CHANNEL: { type: 'CREATE_CHANNEL', reducer: 'WORKSTATION' },
  EDIT_CHANNEL: { type: 'MODIFY_CHANNEL', reducer: 'WORKSTATION' },
  SET_SETTINGS: { type: 'SET_SETTINGS', reducer: 'WORKSTATION' },
  SET_EDITOR: { type: 'SET_EDITOR', reducer: 'EDITOR' },
  CREATE_WINDOW: { type: 'CREATE_WINDOW', reducer: 'GENERAL' },
  FOCUS_WINDOW: { type: 'FOCUS_WINDOW', reducer: 'GENERAL' },
  BLUR_WINDOW: { type: 'BLUR_WINDOW', reducer: 'GENERAL' },
  SET_STATE: { type: 'SET_STATE', reducer: 'GENERAL' }
});

export const INITIAL_STATE = {
  workstation: {
    files: [],
    tracks: [],
    channels: [],
    settings: {
      bpm: 120,
      key: 'C',
      timesig: [4, 4],
      fileBrowser: true
    }
  },
  editor: {
    synth: [],
    open: null
  },
  windows: []
};

export const INITIAL_SETTINGS = {
  mute: false,
  volume: 50,
  pan: 0,
  continuous: false,
  channel: []
};

export const INITIAL_CHANNEL_SETTINGS = {
  continuous: false,
  tracks: [],
  features: [
    {
      name: 'Volume',
      controller: -1
    },
    {
      name: 'Pitch',
      controller: -1
    },
    {
      name: 'Pan',
      controller: -1
    },
    {
      name: 'Tempo',
      controller: -1
    }
  ]
};
