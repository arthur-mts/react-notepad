import AsyncStorage from '@react-native-community/async-storage';

const TABLE_NAME = '@MyNotes3';

export async function getNotes() {
  const notes = await AsyncStorage.getItem(TABLE_NAME);
  if (!notes) {
    await AsyncStorage.setItem(TABLE_NAME, JSON.stringify([]));
    return [];
  }
  return JSON.parse(notes);
}

export async function presistNote(noteValue) {
  const notes = await getNotes();
  const note = { value: noteValue, id: `${new Date().getTime()}` };
  notes.push(note);
  await AsyncStorage.removeItem(TABLE_NAME);
  await AsyncStorage.setItem(TABLE_NAME, JSON.stringify(notes));
  return note;
}

export async function removeNote(id) {
  let notes = await getNotes();
  notes = notes.filter((item) => item.id !== id);
  console.log(notes);
  await AsyncStorage.removeItem(TABLE_NAME);
  await AsyncStorage.setItem(TABLE_NAME, JSON.stringify(notes));
}
