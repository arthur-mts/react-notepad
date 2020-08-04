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
  const note = { value: noteValue, id: `${new Date().getTime()}`, checked: false };
  notes.push(note);
  await AsyncStorage.removeItem(TABLE_NAME);
  await AsyncStorage.setItem(TABLE_NAME, JSON.stringify(notes));
  return note;
}

export async function updateNote(id, text, checked) {
  let notes = await getNotes();
  notes = notes.map((item) => {
    if (item.id === id) {
      return {
        id,
        checked: checked !== undefined ? checked : item.checked,
        value: text !== undefined ? text : item.value,
      };
    }
    return item;
  });
  await AsyncStorage.removeItem(TABLE_NAME);
  await AsyncStorage.setItem(TABLE_NAME, JSON.stringify(notes));
}

export async function removeNote(id) {
  let notes = await getNotes();
  notes = notes.filter((item) => item.id !== id);
  await AsyncStorage.removeItem(TABLE_NAME);
  await AsyncStorage.setItem(TABLE_NAME, JSON.stringify(notes));
}
