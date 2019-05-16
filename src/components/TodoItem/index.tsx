import * as React from 'react';
import { ITodoItem } from 'interfaces/todo/ITodoItem';
import * as s from './style.css';
import * as actions from '../../store/todo/action';

interface ComponentProps {
  key: number;
  item: ITodoItem;
  onDelete: typeof actions.deleteTodo;
  onComplete: typeof actions.completeTodo;
}

const TodoItem: React.FC<ComponentProps> = ({ item, ...actions }) => (
  <li className={item.completed ? s.done : ''}>
    {actions.onComplete && (
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => actions.onComplete({ id: item.id })}
      />
    )}
    {item.message}
    {actions.onDelete && <button onClick={() => actions.onDelete({ id: item.id })}>x</button>}
  </li>
);

export default TodoItem;
