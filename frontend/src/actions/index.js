import {
  UPLOAD_FILE,
  SELECT_COLUMN,
  ADD_TRACK,
  ADJUST_SETTINGS,
  ADJUST_GLOBAL_SETTINGS
} from '../constants/action-types';

export const uploadFile = payload => ({
  type: UPLOAD_FILE,
  payload
});

export const selectColumn = payload => ({
  type: SELECT_COLUMN,
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