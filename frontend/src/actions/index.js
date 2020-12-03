import { UPLOAD_FILE, SELECT_COLUMN, ADD_TRACK } from '../constants/action-types';

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