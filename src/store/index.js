import { combineReducers, createStore } from 'redux';
import notesReducer from './reducers/notes';

const reducers = combineReducers({
  notes: notesReducer,
});

export default createStore(reducers);
