import { State } from "store/types";

export const selectTodoList = (state: State) => state.todo.list;