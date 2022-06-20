import cloneDeep from 'lodash.clonedeep';

export const FillType = Object.freeze({
  STRETCH: 'Stretch',
  REPEAT: 'Repeat',
  WRAP: 'Wrap'
})

export const ActionType = Object.freeze({
  reducer: {
    WORKSTATION: 'WORKSTATION',
    EDITOR: 'EDITOR',
    GENERAL: 'GENERAL'
  },
  UPLOAD_FILE: { type: 'UPLOAD_FILE', reducer: 'WORKSTATION' },
  CREATE_TRACK: { type: 'CREATE_TRACK', reducer: 'WORKSTATION' },
  EDIT_TRACK: { type: 'EDIT_TRACK', reducer: 'WORKSTATION' },
  EDIT_TRACK_DATA: { type: 'EDIT_TRACK_DATA', reducer: 'WORKSTATION' },
  DELETE_TRACK: { type: 'DELETE_TRACK', reducer: 'WORKSTATION' },
  CREATE_CHANNEL: { type: 'CREATE_CHANNEL', reducer: 'WORKSTATION' },
  EDIT_CHANNEL: { type: 'EDIT_CHANNEL', reducer: 'WORKSTATION' },
  EDIT_CHANNEL_FEATURES: { type: 'EDIT_CHANNEL_FEATURES', reducer: 'WORKSTATION' },
  EDIT_CHANNEL_SYNTH: { type: 'EDIT_CHANNEL_SYNTH', reducer: 'WORKSTATION' },
  EDIT_CHANNEL_FILL: { type: 'EDIT_CHANNEL_FILL', reducer: 'WORKSTATION' },
  SET_SETTINGS: { type: 'SET_SETTINGS', reducer: 'WORKSTATION' },
  ADD_PROFILE: { type: 'ADD_PROFILE', reducer: 'WORKSTATION' },
  ADD_SYNTH: { type: 'ADD_SYNTH', reducer: 'WORKSTATION' },
  CREATE_WINDOW: { type: 'CREATE_WINDOW', reducer: 'GENERAL' },
  FOCUS_WINDOW: { type: 'FOCUS_WINDOW', reducer: 'GENERAL' },
  BLUR_WINDOW: { type: 'BLUR_WINDOW', reducer: 'GENERAL' },
  SET_STATE: { type: 'SET_STATE', reducer: 'GENERAL' }
});

export const INITIAL_SETTINGS = {
  mute: false,
  volume: 50,
  pan: 0,
  continuous: false,
  channel: ['Main'],
  profile: 'Default'
};

const INITIAL_PROFILE_SETTINGS = {
  map: 'x',
  filter: false
};

const INITIAL_SYNTH_SETTINGS = {
  name: 'Default',
  nodes: [{ name: 'osc', type: 'oscillator' }, { name: 'gain', type: 'gain' }, { name: 'pan', type: 'panner' }],
  connections: [{ osc: 'pan' }, { pan: 'gain' }, { gain: { name: 'context', property: 'destination' } }],
  variables: { Frequency: 440, Volume: 1, Pan: 0 },
  inputs: { osc: 'Frequency', gain: 'Volume', pan: 'Pan' },
  adsrd: { values: [0.025, 0, 1, 0.025, 0.5], nodes: ['gain'] }
};

export const INITIAL_CHANNEL_SETTINGS = {
  continuous: false,
  tracks: [],
  synth: 'Default',
  features: {
    Attack: { track: -1, fill: FillType.STRETCH },
    Decay: { track: -1, fill: FillType.STRETCH },
    Sustain: { track: -1, fill: FillType.STRETCH },
    Release: { track: -1, fill: FillType.STRETCH },
    Duration: { track: -1, fill: FillType.STRETCH }
  }
};

Object.keys(INITIAL_SYNTH_SETTINGS.variables).forEach(variable => INITIAL_CHANNEL_SETTINGS.features[variable] = { track: -1, fill: FillType.STRETCH });

export const INITIAL_STATE = {
  workstation: {
    files: {},
    tracks: {},
    channels: { Main: cloneDeep(INITIAL_CHANNEL_SETTINGS) },
    profiles: { Default: cloneDeep(INITIAL_PROFILE_SETTINGS) },
    synths: { Default: cloneDeep(INITIAL_SYNTH_SETTINGS) },
    settings: {
      bpm: 120,
      key: 'C',
      timesig: [4, 4],
      fileBrowser: true
    }
  },
  windows: []
};
