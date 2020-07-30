import {AsyncStorage } from 'react-native';

const TABLE_NAME = '@NOTES';

const ID_COUNTER_TABLE = '@COUNTER';

async function generateId(){
    let counter;
    try {
        counter = await AsyncStorage.getItem(ID_COUNTER_TABLE);
        counter+=1;
        AsyncStorage.removeItem(ID_COUNTER_TABLE);
        AsyncStorage.setItem(ID_COUNTER_TABLE, toString(counter));
        return parseInt(counter);
    }
    catch(e){
        await AsyncStorage.setItem(ID_COUNTER_TABLE, '0');
    }
}

export async function getNotes(){
    let notes;
    try{
        notes = await AsyncStorage.getItem(TABLE_NAME);
        return JSON.parse(notes);
    }
    catch(e){
        //Start empaty notes list
        await AsyncStorage.setItem(TABLE_NAME, JSON.stringify([]));
        return [];
    }
}

export async function presistNote(noteValue){
    try {
        const notes = await getNotes();
        const id = await generateId();
        const note = {value: noteValue, id}
        notes.push(note);
        await AsyncStorage.removeItem(TABLE_NAME);
        await AsyncStorage.setItem(JSON.stringify(notes));
        return;
    }
    catch(e){
        return;
    }
    
}