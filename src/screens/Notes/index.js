import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNotes } from '../../hooks/Notes';

// import { Container } from './styles';

function Notes() {
  const { notes } = useNotes();
  useEffect(()=>{
    console.log(notes);
  }, []);
  return <View><Text>Notes</Text></View>;
}

export default Notes;