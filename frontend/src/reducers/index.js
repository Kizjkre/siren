import { UPLOAD_FILE } from '../constants/action-types';

const initialState = {
  files: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_FILE:
      return Object.assign({}, state, {
        files: [...state.files, action.payload]
      });
    default:
      return state;
  }
};

export default rootReducer;