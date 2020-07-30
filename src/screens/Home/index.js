import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, ToastAndroid, Keyboard,
} from 'react-native';
import Constants from 'expo-constants';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useNotes } from '../../hooks/Notes';

function Home() {
  const { addNote, notes } = useNotes();

  const [input, setInput] = useState('');

  const handleSaveNote = useCallback(() => {
    addNote(input).then((res) => {
      ToastAndroid.show('A nota foi salva com sucesso!', ToastAndroid.SHORT);
      setInput('');
    }).catch(({ message }) => {
      ToastAndroid.show(message, ToastAndroid.LONG);
    });
  }, [input, setInput]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Digite algo para lembrar!</Text>
      <TextInput value={input} onChangeText={(e) => setInput(e)} multiline numberOfLines={2} style={styles.input} />

      <TouchableOpacity onPress={handleSaveNote} style={styles.button} activeOpacity={0.8}>
        <Text>Salvar nota</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 12,
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: '#ccc',
    borderColor: '#f0f0f0',
    padding: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  input: {
    marginTop: 20,
    borderRadius: 4,
    borderColor: '#c0c0c0',
    padding: 8,
    borderWidth: 2,
    width: '60%',
  },
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
