import { UPLOAD_FILE, SELECT_COLUMN } from '../constants/action-types';

const initialState = {
  files: [],
  columns: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_FILE:
      return Object.assign({}, state, {
        files: [...state.files, action.payload]
      });
    case SELECT_COLUMN:
      return Object.assign({}, state, {
        columns: [...state.columns, action.payload]
      });
    default:
      return state;
  }
};

export default rootReducer;