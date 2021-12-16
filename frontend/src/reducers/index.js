import { INITIAL_STATE, ActionType } from '../constants/state';
import workstationReducer from './workstation';
import generalReducer from './general';

const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type.reducer) {
    case ActionType.reducer.WORKSTATION:
      return Object.assign({}, state, {
        workstation: workstationReducer(state.workstation, action)
      });
    case ActionType.reducer.GENERAL:
      return generalReducer(state, action);
    default:
      return state;
  }
};

export default rootReducer;
