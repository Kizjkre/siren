import cloneDeep from 'lodash.clonedeep';
import defaultSynth, { parameters } from '../util/synth/default';

export const FillType = Object.freeze({
  STRETCH: 'Stretch',
  REPEAT: 'Repeat',
  WRAP: 'Wrap',
  FIT: 'Fit',
  FILL: 'Fill'
});

export const PARAMETER_TYPE = Object.freeze({
  TIME: 'TIME',
  TIMBRAL: 'TIMBRAL'
});

const reducers = Object.freeze({
  WORKSTATION: 'WORKSTATION',
  GENERAL: 'GENERAL'
});

export const ActionType = Object.freeze({
  reducer: reducers,
  BLUR_WINDOW: { type: 'BLUR_WINDOW', reducer: reducers.GENERAL },
  CREATE_WINDOW: { type: 'CREATE_WINDOW', reducer: reducers.GENERAL },
  FOCUS_WINDOW: { type: 'FOCUS_WINDOW', reducer: reducers.GENERAL },
  SET_STATE: { type: 'SET_STATE', reducer: reducers.GENERAL },
  ADD_PROFILE: { type: 'ADD_PROFILE', reducer: reducers.WORKSTATION },
  ADD_SYNTH: { type: 'ADD_SYNTH', reducer: reducers.WORKSTATION },
  CREATE_CHANNEL: { type: 'CREATE_CHANNEL', reducer: reducers.WORKSTATION },
  CREATE_TRACK: { type: 'CREATE_TRACK', reducer: reducers.WORKSTATION },
  DELETE_TRACK: { type: 'DELETE_TRACK', reducer: reducers.WORKSTATION },
  EDIT_CHANNEL: { type: 'EDIT_CHANNEL', reducer: reducers.WORKSTATION },
  EDIT_CHANNEL_FEATURES: { type: 'EDIT_CHANNEL_FEATURES', reducer: reducers.WORKSTATION },
  EDIT_CHANNEL_FILL: { type: 'EDIT_CHANNEL_FILL', reducer: reducers.WORKSTATION },
  EDIT_CHANNEL_SYNTH: { type: 'EDIT_CHANNEL_SYNTH', reducer: reducers.WORKSTATION },
  EDIT_TRACK: { type: 'EDIT_TRACK', reducer: reducers.WORKSTATION },
  EDIT_TRACK_DATA: { type: 'EDIT_TRACK_DATA', reducer: reducers.WORKSTATION },
  SET_SETTINGS: { type: 'SET_SETTINGS', reducer: reducers.WORKSTATION },
  UPDATE_SYNTH: { type: 'UPDATE_SYNTH', reducer: reducers.WORKSTATION },
  UPLOAD_FILE: { type: 'UPLOAD_FILE', reducer: reducers.WORKSTATION }
});

export const INITIAL_TRACK_SETTINGS = {
  continuous: false,
  channel: ['Main'],
  profile: 'Default'
};

export const INITIAL_CHANNEL_SETTINGS = {
  tracks: [],
  synth: 'Default',
  features: {
    Frequency: { track: -1, fill: FillType.STRETCH, type: PARAMETER_TYPE.TIMBRAL },
    Gain: { track: -1, fill: FillType.STRETCH, type: PARAMETER_TYPE.TIMBRAL },
    Pan: { track: -1, fill: FillType.STRETCH, type: PARAMETER_TYPE.TIMBRAL },
    Duration: { track: -1, fill: FillType.STRETCH, type: PARAMETER_TYPE.TIME }
  }
};

export const INITIAL_STATE = {
  workstation: {
    files: {},
    tracks: {},
    channels: { Main: cloneDeep(INITIAL_CHANNEL_SETTINGS) },
    profiles: { Default: 'x' },
    synths: {
      Default: {
        code: `export const parameters = ${ JSON.stringify(parameters) }; const defaultSynth = ${ defaultSynth.toString() }; export default defaultSynth;`,
        uuid: crypto.randomUUID(),
        settings: {
          parameters: [],
          ref: null,
          port: null
        }
      }
    },
    settings: {
      fileBrowser: true
    }
  },
  windows: []
};
