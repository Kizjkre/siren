import cloneDeep from 'lodash.clonedeep';
import {
  ActionType,
  FillType,
  INITIAL_CHANNEL_SETTINGS,
  INITIAL_TRACK_SETTINGS,
  PARAMETER_TYPE
} from '../constants/state';

const workstationReducer = (state, action) => {
  switch (action.type.type) {
    case ActionType.UPLOAD_FILE.type:
      return Object.assign({}, state, {
        files: {
          ...state.files,
          [action.payload.name]: action.payload.data
        }
      });
    case ActionType.CREATE_TRACK.type:
      return (() => {
        let id = Math.max(...Object.keys(state.tracks));
        id = id === -Infinity ? 0 : id + 1;
        return Object.assign({}, state, {
          tracks: {
            ...state.tracks,
            [id]: {
              ...action.payload,
              settings: cloneDeep(INITIAL_TRACK_SETTINGS)
            }
          },
          channels: {
            ...state.channels,
            Main: { ...state.channels.Main, tracks: [...state.channels.Main.tracks, id] }
          }
        });
      })();
    case ActionType.EDIT_TRACK.type:
      return Object.assign({}, state, {
        tracks: {
          ...state.tracks,
          [action.payload.id]: {
            ...state.tracks[action.payload.id],
            settings: { ...state.tracks[action.payload.id].settings, ...action.payload.settings }
          }
        }
      });
    case ActionType.EDIT_TRACK_DATA.type:
      return Object.assign({}, state, {
        tracks: {
          ...state.tracks,
          [action.payload.id]: {
            ...state.tracks[action.payload.id],
            data: action.payload.data
          }
        }
      });
    case ActionType.DELETE_TRACK.type:
      return (() => {
        const tracks = Object.assign({}, state.tracks);
        delete tracks[action.payload];

        const channels = cloneDeep(state.channels);
        for (const name in channels) {
          if (channels.hasOwnProperty(name)) {
            channels[name].tracks = channels[name].tracks.filter(track =>
              track !== parseInt(action.payload)
            );
          }
        }

        return Object.assign({}, state, { tracks, channels });
      })();
    case ActionType.CREATE_CHANNEL.type:
      return Object.assign({}, state, {
        channels: Object.assign({}, state.channels, {
          [action.payload]: cloneDeep(INITIAL_CHANNEL_SETTINGS)
        })
      });
    case ActionType.EDIT_CHANNEL.type:
      return (() => {
        const channel = cloneDeep(state.channels[action.payload.name]);
        const index = channel.tracks.indexOf(action.payload.trackId);
        const tracks = cloneDeep(state.tracks);
        if (index === -1) {
          channel.tracks.push(action.payload.trackId);
          tracks[action.payload.trackId].settings.channel.push(action.payload.name);
        } else {
          channel.tracks.splice(index, 1);
          tracks[action.payload.trackId].settings.channel.splice(
            tracks[action.payload.trackId].settings.channel.indexOf(action.payload.name),
            1
          );
        }
        return Object.assign({}, state, {
          tracks,
          channels: Object.assign({}, state.channels, { [action.payload.name]: channel })
        });
      })();
    case ActionType.EDIT_CHANNEL_FEATURES.type:
      return (() => {
        const channel = cloneDeep(state.channels);
        if (channel[action.payload.channel].features[action.payload.feature].track === action.payload.track) {
          channel[action.payload.channel].features[action.payload.feature].track = -1;
        } else {
          channel[action.payload.channel].features[action.payload.feature].track = action.payload.track;
        }
        return Object.assign({}, state, {
          channels: Object.assign({}, state.channels, channel)
        });
      })();
    case ActionType.EDIT_CHANNEL_SYNTH.type:
      return (() => {
        const channel = cloneDeep(state.channels);
        channel[action.payload.channel].synth = action.payload.synth;
        channel[action.payload.channel].features = {
          ...Object.fromEntries(state.synths[action.payload.synth].settings.parameters.timbral.map(parameter => [parameter, { track: -1, fill: FillType.STRETCH, type: PARAMETER_TYPE.TIMBRAL }])),
          ...Object.fromEntries(state.synths[action.payload.synth].settings.parameters.time.map(parameter => [parameter, { track: -1, fill: FillType.STRETCH, type: PARAMETER_TYPE.TIME }]))
        };
        return Object.assign({}, state, {
          channels: Object.assign({}, state.channels, channel)
        });
      })();
    case ActionType.EDIT_CHANNEL_FILL.type:
      return (() => {
        const channel = cloneDeep(state.channels);
        channel[action.payload.channel].features[action.payload.feature].fill = action.payload.fill;
        return Object.assign({}, state, {
          channels: Object.assign({}, state.channels, channel)
        });
      })();
    case ActionType.SET_SETTINGS.type:
      return Object.assign({}, state, {
        settings: {
          ...state.settings,
          ...action.payload
        }
      });
    case ActionType.ADD_PROFILE.type:
      return Object.assign({}, state, {
        profiles: {
          ...state.profiles,
          ...action.payload
        }
      });
    case ActionType.ADD_SYNTH.type:
      return Object.assign({}, state, {
        synths: {
          ...state.synths,
          [action.payload.name]: {
            code: action.payload.code,
            comments: [...action.payload.code.matchAll(/(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(\/\/.*)/g, '')], // TODO: Fix
            uuid: crypto.randomUUID(),
            settings: {
              parameters: [],
              ref: null
            }
          }
        }
      });
    case ActionType.UPDATE_SYNTH.type:
      return Object.assign({}, state, {
        synths: {
          ...state.synths,
          [action.payload.name]: {
            ...state.synths[action.payload.name],
            settings: {
            ...state.synths[action.payload.name].settings,
              ...action.payload.settings
            }
          }
        }
      });
    default:
      return state;
  }
};

export default workstationReducer;
