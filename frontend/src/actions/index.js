import {
  UPLOAD_FILE,
  ADD_TRACK,
  ADJUST_SETTINGS,
  ADJUST_GLOBAL_SETTINGS, FOCUS_WINDOW
} from '../constants/action-types';

export const uploadFile = payload => ({
  type: UPLOAD_FILE,
  payload
});

export const addTrack = payload => ({
  type: ADD_TRACK,
  payload
});

export const adjustSettings = payload => ({
  type: ADJUST_SETTINGS,
  payload
});

export const adjustGlobalSettings = payload => ({
  type: ADJUST_GLOBAL_SETTINGS,
  payload
});

export const focusWindow = payload => ({
  type: FOCUS_WINDOW,
  payload
});