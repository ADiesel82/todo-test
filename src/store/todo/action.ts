import { createAction } from 'redux-actions';
import { ITodoItem } from 'interfaces/todo/ITodoItem';
import * as ActionType from './types';

export const addTodo = createAction<Pick<ITodoItem, 'message'>>(ActionType.ADD_TODO);
export const deleteTodo = createAction<Pick<ITodoItem, 'id'>>(ActionType.DELETE_TODO);
export const completeTodo = createAction<Pick<ITodoItem, 'id'>>(ActionType.COMPLETE_TODO);
