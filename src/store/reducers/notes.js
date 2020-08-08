import { ADD_NOTE, REMOVE_NOTE } from '../actions/types';

export default function (state, action) {
  console.log(state, action);
  switch (action.type) {
    case ADD_NOTE:
      return [...state, action.payload];
    case REMOVE_NOTE:
      return ['nota 1'];
    default:
      return ['nota 1', 'nota2'];
  }
}
