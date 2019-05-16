import { handleActions } from 'redux-actions';
import { ITodoItem } from 'interfaces/todo/ITodoItem';
import * as ActionType from './types';

const initialState: ActionType.TodoState = {
    list: [
        {
            id: 1,
            message: 'Write a TODO app',
            completed: true,
        },
        {
            id: 2,
            message: 'Pass an interview',
            completed: false,
        },
        {
            id: 3,
            message: 'Take the new job',
            completed: false,
        }
    ]
};

export const todoReducer = handleActions<ActionType.TodoState, ITodoItem>(
    {
        [ActionType.ADD_TODO]: (state, action) => {
            return {
                ...state,
                list: [
                    ...state.list,
                    {
                        id: state.list.reduce((max, todo) => Math.max(todo.id || 1, max), 0) + 1,
                        completed: false,
                        message: action.payload.message
                    },
                ]
            };
        },
        [ActionType.DELETE_TODO]: (state, action) => {
            const newList = state.list.filter(todo => todo.id !== action.payload.id);
            return {
                ...state,
                list: newList
            };
        },
        [ActionType.COMPLETE_TODO]: (state, action) => {
            const newList = state.list.map((todo) =>
                todo.id === (action.payload.id) ? { ...todo, completed: !todo.completed } : todo
            );
            return {
                ...state,
                list: newList
            };
        },
    },
    initialState
);
