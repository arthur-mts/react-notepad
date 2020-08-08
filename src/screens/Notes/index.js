import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Constants from 'expo-constants';
import {
  View, Text, StyleSheet, ToastAndroid,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { useNotes } from '../../hooks/Notes';

import Note from '../../components/Note';

import { removeNote as reduxRemoveNote } from '../../store/actions';

function Notes(props) {
  const { notes, removeNote, updateNote } = useNotes();

  const [checkedNotes, setCheckedNotes] = useState([]);

  const [uncheckedNotes, setUncheckedNotes] = useState([]);

  const handleToggleCheck = useCallback(async (id, checked) => {
    await updateNote({ id, checked: !checked });
  });

  const handleRemoveNote = useCallback((id) => {
    props.removeNote(id);
    removeNote(id).then(
      () => ToastAndroid.show('Nota removida com sucesso!', ToastAndroid.SHORT),
    )
      .catch(
        () => ToastAndroid.show('Erro na remoção!', ToastAndroid.LONG),
      );
  }, []);

  useEffect(() => {
    setCheckedNotes(notes.filter((note) => note.checked));
    setUncheckedNotes(notes.filter((note) => !note.checked));
  }, [notes]);

  return (
    <View style={styles.container}>

      <View style={{ ...styles.content, marginRight: 12 }}>
        <Text style={styles.listTitle}>
          A fazer
        </Text>
        <FlatList
          data={uncheckedNotes}
          contentContainerStyle={styles.todoListContainer}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <Note
              item={item}
              handleRemoveNote={handleRemoveNote}
              handleToggleCheck={handleToggleCheck}
            />
          )}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.listTitle}>
          Feito
        </Text>
        <FlatList
          data={checkedNotes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.doneListContainer}
          ItemSeparatorComponent={() => <View style={styles.separator} />}

          renderItem={({ item }) => (
            <Note
              item={item}
              handleRemoveNote={handleRemoveNote}
              handleToggleCheck={handleToggleCheck}
            />
          )}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  listTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    marginTop: Constants.statusBarHeight,
    paddingHorizontal: 8,
    paddingVertical: 24,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'column',
    flex: 1,
    marginBottom: 12,
  },
  separator: {
    height: 12,
  },
  doneListContainer: {
    overflow: 'scroll',
  },
  todoListContainer: {
    overflow: 'scroll',
    marginBottom: 24,
  },

});

function mapActionCreatorsToProp(dispatch) {
  return {
    removeNote(note) {
      const action = reduxRemoveNote(note);
      dispatch(action);
    },
  };
}

export default connect((state) => ({ notes: state.notes }), mapActionCreatorsToProp)(Notes);
