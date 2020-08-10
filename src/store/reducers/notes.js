import {
  RELOAD_NOTES, CLEAR_INPUT,
} from '../actions/types';

export default function (state, action) {
  switch (action.type) {
    case RELOAD_NOTES:
      return action.payload;
    case CLEAR_INPUT:
      action.payload();
      return state;
    default:
      return [];
  }
}
