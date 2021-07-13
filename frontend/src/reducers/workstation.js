import { ActionType, INITIAL_CHANNEL_SETTINGS, INITIAL_SETTINGS } from '../constants/state';
import { deepClone } from '../helper/processing';

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
      let idCreateTrack = Math.max(...Object.keys(state.tracks));
      idCreateTrack = idCreateTrack === -Infinity ? 0 : idCreateTrack + 1;
      return Object.assign({}, state, {
        tracks: { ...state.tracks, [idCreateTrack]: { ...action.payload, settings: deepClone(INITIAL_SETTINGS) } },
        channels: {
          ...state.channels,
          Main: { ...state.channels.Main, tracks: [...state.channels.Main.tracks, idCreateTrack] }
        }
      });
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
      const tracksDeleteTrack = Object.assign({}, state.tracks);
      delete tracksDeleteTrack[action.payload];

      const channelsDeleteTrack = deepClone(state.channels);
      for (const name in channelsDeleteTrack) {
        if (channelsDeleteTrack.hasOwnProperty(name)) {
          channelsDeleteTrack[name].tracks = channelsDeleteTrack[name].tracks.filter(track =>
            track.id !== parseInt(action.payload)
          );
        }
      }

      return Object.assign({}, state, { tracks: tracksDeleteTrack, channels: channelsDeleteTrack });
    case ActionType.CREATE_CHANNEL.type:
      return Object.assign({}, state, {
        channels: Object.assign({}, state.channels, {
          [action.payload]: deepClone(INITIAL_CHANNEL_SETTINGS)
        })
      });
    case ActionType.EDIT_CHANNEL.type:
      const channelEditChannel = deepClone(state.channels[action.payload.name]);
      const index = channelEditChannel.tracks.indexOf(action.payload.trackId);
      const tracksEditChannel = deepClone(state.tracks);
      if (index === -1) {
        channelEditChannel.tracks.push(action.payload.trackId);
        tracksEditChannel[action.payload.trackId].settings.channel.push(action.payload.name);
      } else {
        channelEditChannel.tracks.splice(index, 1);
        tracksEditChannel[action.payload.trackId].settings.channel.splice(
          tracksEditChannel[action.payload.trackId].settings.channel.indexOf(action.payload.name),
          1
        );
      }
      return Object.assign({}, state, {
        tracks: tracksEditChannel,
        channels: Object.assign({}, state.channels, { [action.payload.name]: channelEditChannel })
      });
    case ActionType.EDIT_CHANNEL_FEATURES.type:
      const channelEditChannelFeatures = deepClone(state.channels);
      if (channelEditChannelFeatures[action.payload.channel].features[action.payload.feature].includes(action.payload.track)) {
        channelEditChannelFeatures[action.payload.channel].features[action.payload.feature].splice(
          channelEditChannelFeatures[action.payload.channel].features[action.payload.feature].indexOf(action.payload.track),
          1
        );
      } else {
        channelEditChannelFeatures[action.payload.channel].features[action.payload.feature].push(action.payload.track);
      }
      return Object.assign({}, state, {
        channels: Object.assign({}, state.channels, channelEditChannelFeatures)
      });
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
