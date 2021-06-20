import { INITIAL_STATE, ActionType } from '../constants/state';
import workstationReducer from './workstation';
import editorReducer from './editor';
import generalReducer from './general';

const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type.reducer) {
    case ActionType.reducer.WORKSTATION:
      return Object.assign({}, state, {
        workstation: workstationReducer(state.workstation, action)
      });
    case ActionType.reducer.EDITOR:
      return Object.assign({}, state, {
        editor: editorReducer(state.editor, action)
      });
    case ActionType.reducer.GENERAL:
      return generalReducer(state, action);
    default:
      return state;
  }
};

export default rootReducer;
