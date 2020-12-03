import { UPLOAD_FILE } from '../constants/action-types';

export const uploadFile = payload => ({
  type: UPLOAD_FILE,
  payload
});