import React, { useCallback, createContext, useState, useContext } from 'react';


import {v1} from 'react-native-uuid';

import {getNotes as getNotesFromDatabase, presistNote} from '../../services/database';

const NotesContext = createContext(null);

export function NotesProvider({children}) {
    const [notes, setNotes] = useState(async ()=>{
        (async ()=>{
            const data = await getNotesFromDatabase();
            return data;
        }   
        )();
    });

    const addNote = useCallback(async (noteValue)=>{
        const note = await presistNote(noteValue);
        setNotes(oldNotes=> [...oldNotes, note]);
        return;
    }, []);

    const getNotes = useCallback(async ()=>{
        const response = await getNotesFromDatabase();
        return response;
    });

    return(
        <NotesContext.Provider value={{addNote, notes}}>
            {children}
        </NotesContext.Provider>
    )

}

export function useNotes(){
    const context = useContext(NotesContext);
    if(!context){
        throw new Error('a hook must be used inside the respective provider!');
    }
    return context;
}
