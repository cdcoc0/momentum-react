import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import './TodoList.scss';

const TodoList = () => {
    const todoLS = localStorage.getItem('TODO');
    const [todoInput, setTodoInput] = useState('');
    const [todos, setTodos] = useState(todoLS ? JSON.parse(todoLS) : []);

    //const nextId = useRef(todos.length + 1);

    const onTodoChange = useCallback(e => setTodoInput(e.target.value), []);
    
    const handleInsert = useCallback(text => {
        let nextId = todoLS ? JSON.parse(todoLS).length + 1 : 1;
        const todo = {id: nextId, text, done: false};
        setTodos(todos.concat(todo));
        localStorage.setItem("TODO", JSON.stringify(todos.concat(todo)));
        nextId += 1;
        setTodoInput('');
    }, [todos, todoLS]);
    
    const onTodoSubmit = useCallback(e => {
        e.preventDefault();
        handleInsert(todoInput);
    }, [handleInsert, todoInput]);

    const onRemove = useCallback(id => {
        const filter = todos.filter(todo => todo.id !== id);
        setTodos(filter);
        localStorage.setItem("TODO", filter ? JSON.stringify(filter) : null);
    }, [todos]);

    const onToggle = useCallback(id => {
        const toggle = todos.map(todo => todo.id === id ? {...todo, done: !todo.done} : todo);
        setTodos(toggle);
        localStorage.setItem("TODO", JSON.stringify(toggle))
    }, [todos]);

    const getTodos = useCallback(() => {
        if(todoLS) {
            const parsedTodos = JSON.parse(todoLS);
            return parsedTodos.map(todo => <TodoItem key={todo.id} todo={todo} onRemove={onRemove} onToggle={onToggle}/>);
        };
        return null;
    }, [todoLS, onRemove, onToggle])

    return(
        <div className="TodoList">
            <form onSubmit={onTodoSubmit}>
                <input type="text" onChange={onTodoChange} value={todoInput} />
                <button type="submit">추가</button>
            </form>
            <div>
                {getTodos()}
            </div>
        </div>
    );
};

export default TodoList;