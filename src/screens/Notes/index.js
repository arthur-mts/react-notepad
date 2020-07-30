import React, { useEffect, useCallback } from 'react';
import Constants from 'expo-constants';
import {
  View, Text, StyleSheet, ToastAndroid,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

import { useNotes } from '../../hooks/Notes';

function Notes() {
  const { notes, removeNote } = useNotes();
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
          <View style={styles.item}>
            <Text style={styles.text}>{item.value}</Text>
            <MaterialIcons onPress={() => handleRemoveNote(item.id)} style={{ alignSelf: 'center' }} size={22} name="close" />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {

    flex: 1,
  },

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
  item: {
    marginRight: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'row',

  },
});

export default Notes;
