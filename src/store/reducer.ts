import { combineReducers } from 'redux';
import { todoReducer } from './todo/reducer';
import { State } from './types';

export const rootReducer = combineReducers<State>({
  todo: todoReducer,
});
