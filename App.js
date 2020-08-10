import React from 'react';
import { Provider } from 'react-redux';
import Routers from './src/routes';
import { NotesProvider } from './src/hooks/Notes';

import store from './src/store';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <NotesProvider>
          <Routers />
        </NotesProvider>
      </Provider>

    </>
  );
}
