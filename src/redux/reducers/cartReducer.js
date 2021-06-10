import { TOGGLE_CARD_HIDDEN } from '../actionTypes.js';
const INITIAL_STATE = { hidden: true };

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_CARD_HIDDEN:
      return { ...state, hidden: !state.hidden };

    default:
      return state;
  }
};

export default cartReducer;