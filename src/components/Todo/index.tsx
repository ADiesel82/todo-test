import * as React from 'react';
import TodoList from 'components/TodoList';
import { TodoNewItem } from 'components/TodoNewItem';
import { connect } from 'react-redux';
import { selectTodoList } from 'store/todo/selectors';
import { State } from 'store/types';
import { ITodoItem } from 'interfaces/todo/ITodoItem';
import * as actions from 'store/todo/action';


interface StateProps {
    list: ITodoItem[];
    onAdd: typeof actions.addTodo;
    onDelete: typeof actions.deleteTodo;
    onComplete: typeof actions.completeTodo;
}

const Todo: React.FC<StateProps> = ({ list, ...actions }) => {
    return (
        <div>
            <TodoNewItem onAdd={actions.onAdd} />
            <TodoList list={list} {...actions} />
        </div>
    );

};

const mapStateToProps = (state: State) => ({
    list: selectTodoList(state),
});

const mapDispatchToProps = {
    onAdd: actions.addTodo,
    onDelete: actions.deleteTodo,
    onComplete: actions.completeTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
