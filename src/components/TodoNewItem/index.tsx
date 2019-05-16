import * as React from 'react';
import { addTodo } from '../../store/todo/action';

interface ComponenProps {
  onAdd: typeof addTodo;
}

export const TodoNewItem: React.FC<ComponenProps> = props => {
  const [message, setMessage] = React.useState<string>('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.currentTarget.value);
  };

  const handleSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value.trim();
    if (event.which === 13 && value.length > 0) {
      props.onAdd({ message: value });
      setMessage('');
    }
  };

  return <input name="" value={message} onChange={onChange} onKeyDown={handleSubmit} />;
};
