import { ActionType } from '../constants/state';
import * as d3 from 'd3';
import { formatCSV, typeify } from '../helper/processing';

export const uploadFile = async (name, raw) => {
  const data = typeify(await d3.csvParse(formatCSV(raw)));

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

export const deleteTrack = id => ({
  type: ActionType.DELETE_TRACK,
  payload: id
});

export const setBPM = bpm => ({
  type: ActionType.SET_SETTINGS,
  payload: { bpm }
});

export const setTimesig = timesig => ({
  type: ActionType.SET_SETTINGS,
  payload: { timesig }
});

export const setKey = key => ({
  type: ActionType.SET_SETTINGS,
  payload: { key }
});

export const setFileBrowser = fileBrowser => ({
  type: ActionType.SET_SETTINGS,
  payload: { fileBrowser }
});

// TODO: Add payload
export const createChannel = () => ({
  type: ActionType.CREATE_CHANNEL,
  payload: null
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

export const setEditorOpen = open => ({
  type: ActionType.SET_EDITOR,
  payload: { open }
});

// TODO: https://stackoverflow.com/questions/14552529/dynamic-sass-variables?
