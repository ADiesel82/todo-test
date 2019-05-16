import * as React from 'react';
import { ITodoItem } from 'interfaces/todo/ITodoItem';
import TodoItem from 'components/TodoItem';
import * as actions from '../../store/todo/action';

interface ComponentProps {
  list: ITodoItem[];
  onDelete: typeof actions.deleteTodo;
  onComplete: typeof actions.completeTodo;
}

const TodoList: React.FC<ComponentProps> = ({ list, ...actions }) => {
  return (
    <ul>
      {list.map((item, i) => (
        <TodoItem key={i} item={item} {...actions} />
      ))}
    </ul>
  );
};

export default TodoList;
