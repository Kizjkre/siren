import { ActionType, INITIAL_STATE } from '../constants/state';
import generalReducer from './general';
import workstationReducer from './workstation';

const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type.reducer) {
    case ActionType.reducer.GENERAL:
      return generalReducer(state, action);
    case ActionType.reducer.WORKSTATION:
      return Object.assign({}, state, {
        workstation: workstationReducer(state.workstation, action)
      });
    default:
      return state;
  }
};

export default rootReducer;
