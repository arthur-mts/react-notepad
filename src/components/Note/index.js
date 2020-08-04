import React from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';

function Note({ item, handleRemoveNote, handleToggleCheck }) {
  return (
    <View style={styles.item}>
      {item.checked
        ? <Feather size={22} name="check-square" onPress={() => handleToggleCheck(item.id, item.checked)} />
        : <Feather size={22} name="square" onPress={() => handleToggleCheck(item.id, item.checked)} /> }
      <Text style={styles.text}>{item.value}</Text>
      <MaterialIcons onPress={() => handleRemoveNote(item.id)} size={22} name="close" />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginHorizontal: 8,
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    marginLeft: 8,
  },
});

export default Note;
