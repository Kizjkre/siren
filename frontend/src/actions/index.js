import { autoType, csvParse } from 'd3';
import { ActionType } from '../constants/state';

export const uploadFile = async (name, raw) => {
  const data = await csvParse(raw, autoType);

  return {
    type: ActionType.UPLOAD_FILE,
    payload: { name, data }
  };
};

export const createTrack = (name, file, data) => ({
  type: ActionType.CREATE_TRACK,
  payload: { name, file, data }
});

export const editTrack = (id, settings) => ({
  type: ActionType.EDIT_TRACK,
  payload: { id, settings }
});

export const editTrackData = (id, data) => ({
  type: ActionType.EDIT_TRACK_DATA,
  payload: { id, data }
});

export const deleteTrack = id => ({
  type: ActionType.DELETE_TRACK,
  payload: id
});

export const setFileBrowser = fileBrowser => ({
  type: ActionType.SET_SETTINGS,
  payload: { fileBrowser }
});

export const createChannel = name => ({
  type: ActionType.CREATE_CHANNEL,
  payload: name
});

export const editChannel = (name, trackId) => ({
  type: ActionType.EDIT_CHANNEL,
  payload: { name, trackId }
});

export const editChannelFeatures = (channel, feature, track) => ({
  type: ActionType.EDIT_CHANNEL_FEATURES,
  payload: { channel, feature, track }
});

export const editChannelSynth = (channel, synth) => ({
  type: ActionType.EDIT_CHANNEL_SYNTH,
  payload: { channel, synth }
});

export const editChannelFill = (channel, feature, fill) => ({
  type: ActionType.EDIT_CHANNEL_FILL,
  payload: { channel, feature, fill }
});

export const setState = state => ({
  type: ActionType.SET_STATE,
  payload: state
});

export const createWindow = id => ({
  type: ActionType.CREATE_WINDOW,
  payload: id
});

export const focusWindow = id => ({
  type: ActionType.FOCUS_WINDOW,
  payload: id
});

export const blurWindow = id => ({
  type: ActionType.BLUR_WINDOW,
  payload: id
});

export const addProfile = (name, map) => ({
  type: ActionType.ADD_PROFILE,
  payload: { [name]: map }
});

export const addSynth = synth => ({
  type: ActionType.ADD_SYNTH,
  payload: synth
});

// TODO: https://stackoverflow.com/questions/14552529/dynamic-sass-variables?
