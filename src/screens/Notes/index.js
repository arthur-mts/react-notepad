import React, { useCallback, useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Constants from 'expo-constants';
import {
  View, Text, StyleSheet,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import Note from '../../components/Note';

import { removeNote as reduxRemoveNote, updateNote as reduxUpdateNote } from '../../store/actions';

function Notes() {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);

  const [checkedNotes, setCheckedNotes] = useState([]);

  const [uncheckedNotes, setUncheckedNotes] = useState([]);

  const handleToggleCheck = useCallback(async (id, checked) => {
    const action = reduxUpdateNote({ id, checked: !checked });
    dispatch(action);
  });

  const handleRemoveNote = useCallback((id) => {
    const action = reduxRemoveNote(id);
    dispatch(action);
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

export default Notes;
// export default connect((state) => ({ notes: state.notes }), mapActionCreatorsToProp)(Notes);
