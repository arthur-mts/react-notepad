// Action creator
import { ADD_NOTE, REMOVE_NOTE } from './types';

function addNote(note) {
  return {
    type: ADD_NOTE,
    payload: note,
  };
}

function removeNote(id) {
  return {
    type: REMOVE_NOTE,
    payload: id,
  };
}

export { addNote, removeNote };
