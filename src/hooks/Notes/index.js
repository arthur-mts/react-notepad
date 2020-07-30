import React, {
  useCallback, createContext, useState, useContext, useEffect,
} from 'react';

import { getNotes as getNotesFromDatabase, presistNote, removeNote as removeNoteFromDatabase } from '../../services/database';

const NotesContext = createContext(null);

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState(
    [],
  );

  useEffect(() => {
    (async () => {
      const data = await getNotesFromDatabase();
      setNotes(data);
    })();
  }, []);

  const addNote = useCallback(async (noteValue) => {
    const note = await presistNote(noteValue);
    setNotes((oldState) => [...oldState, note]);
    return note;
  }, []);

  const removeNote = useCallback(async (id) => {
    try {
      await removeNoteFromDatabase(id);
      setNotes(await getNotesFromDatabase());
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }, []);

  return (
    <NotesContext.Provider value={{ addNote, notes, removeNote }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('a hook must be used inside the respective provider!');
  }
  return context;
}
