import { ITodoItem } from "interfaces/todo/ITodoItem";


export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';


export interface TodoState {
    list: ITodoItem[],
}