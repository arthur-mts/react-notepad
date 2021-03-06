import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Routers from './src/routes';
import { NotesProvider } from './src/hooks/Notes';

export default function App() {
  return (
    <>
      <StatusBar style={"dark"} />
      <NotesProvider>
        <Routers/>
      </NotesProvider>
    </>
  );
}
