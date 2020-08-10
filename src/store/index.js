import { combineReducers, createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import multi from 'redux-multi';
import thunk from 'redux-thunk';
import notesReducer from './reducers/notes';

const reducers = combineReducers({
  notes: notesReducer,
});

export default applyMiddleware(promise, multi, thunk)(createStore)(reducers);
