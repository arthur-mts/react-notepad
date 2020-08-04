import React, { useCallback } from 'react';
import Constants from 'expo-constants';
import {
  View, Text, StyleSheet, ToastAndroid,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { useNotes } from '../../hooks/Notes';

import Note from '../../components/Note';

function Notes() {
  const { notes, removeNote, updateNote } = useNotes();

  const handleToggleCheck = useCallback(async (id, checked) => {
    await updateNote({ id, checked: !checked });
  });

  const handleRemoveNote = useCallback((id) => {
    removeNote(id).then(
      () => ToastAndroid.show('Nota removida com sucesso!', ToastAndroid.SHORT),
    )
      .catch(
        () => ToastAndroid.show('Erro na remoção!', ToastAndroid.LONG),
      );
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        contentContainerStyle={styles.content}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <Note item={item} handleRemoveNote={handleRemoveNote} handleToggleCheck={handleToggleCheck} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  content: {
    paddingVertical: 24,
  },
  separator: {
    height: 12,
  },

});

export default Notes;
