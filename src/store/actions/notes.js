// Action creator
import { RELOAD_NOTES } from './types';

import {
  presistNote, removeNote as databaseRemoveNote, getNotes, updateNote as databaseUpdateNote,
} from '../../services/database';

function reloadNotes() {
  return (dispatch) => getNotes().then((res) => dispatch({ type: RELOAD_NOTES, payload: res }));
}

function updateNote({ id, checked, text }) {
  return (dispatch) => {
    databaseUpdateNote(id, text, checked).then(() => {
      dispatch(reloadNotes());
    });
  };
}

function addNote({ note, setInput, dimissKeyboard }) {
  return (dispatch) => {
    presistNote(note).then(() => {
      setInput('');
      dimissKeyboard();
      dispatch(reloadNotes());
    });
  };
}

function removeNote(payload) {
  return (dispatch) => {
    databaseRemoveNote(payload).then(() => dispatch(reloadNotes()));
  };
}

export {
  addNote, removeNote, reloadNotes, updateNote,
};
