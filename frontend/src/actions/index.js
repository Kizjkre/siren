import {
  UPLOAD_FILE,
  ADD_TRACK,
  SET_SETTINGS,
  SET_GLOBAL_SETTINGS, FOCUS_WINDOW, DELETE_TRACK, SET_DATA
} from '../constants/state';
import * as d3 from 'd3';
import { formatCSV } from '../helper/processing';

export const uploadFile = async (name, raw) => {
  const data = await d3.csvParse(formatCSV(raw));
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

export const setGlobalSettings = settings => ({
  type: SET_GLOBAL_SETTINGS,
  payload: settings
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
