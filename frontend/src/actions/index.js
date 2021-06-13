import {
  UPLOAD_FILE,
  ADD_TRACK,
  SET_SETTINGS,
  SET_GLOBAL_SETTINGS, FOCUS_WINDOW, DELETE_TRACK, SET_DATA, SET_STATE, SET_EDITOR
} from '../constants/state';
import * as d3 from 'd3';
import { formatCSV, typeify } from '../helper/processing';

export const uploadFile = async (name, raw) => {
  const data = typeify(await d3.csvParse(formatCSV(raw)));

  return {
    type: UPLOAD_FILE,
    payload: { name, data }
  };
};

export const addTrack = (name, file, data) => ({
  type: ADD_TRACK,
  payload: { name, file, data }
});

export const setSettings = (id, settings) => ({
  type: SET_SETTINGS,
  payload: { id, settings }
});

export const setGlobalBPM = bpm => ({
  type: SET_GLOBAL_SETTINGS,
  payload: { bpm }
});

export const setGlobalTimesig = timesig => ({
  type: SET_GLOBAL_SETTINGS,
  payload: { timesig }
});

export const setGlobalKey = key => ({
  type: SET_GLOBAL_SETTINGS,
  payload: { key }
});

export const setGlobalDark = dark => ({
  type: SET_GLOBAL_SETTINGS,
  payload: { dark }
});

export const setGlobalChannels = channels => ({
  type: SET_GLOBAL_SETTINGS,
  payload: { channels }
});

export const setGlobalFileBrowser = fileBrowser => ({
  type: SET_GLOBAL_SETTINGS,
  payload: { fileBrowser }
});

export const focusWindow = window => ({
  type: FOCUS_WINDOW,
  payload: window
});

export const deleteTrack = id => ({
  type: DELETE_TRACK,
  payload: id
});

export const setData = (id, data) => ({
  type: SET_DATA,
  payload: { id, data }
});

export const setState = state => ({
  type: SET_STATE,
  payload: state
});

export const setSynth = synth => ({
  type: SET_EDITOR,
  payload: { synth }
});

export const setEditorOpen = open => ({
  type: SET_EDITOR,
  payload: { open }
});
