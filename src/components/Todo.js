import React, { useState } from 'react';

const todo = props => {
    const [ todoName, setTodoName ] = useState('');
    const [ todoList, setTodoList ] = useState([]);


    const inputChangeHandler = (event) => {
        setTodoName(event.target.value);
    };

    const todoAddHandler = () => {
        setTodoList(todoList.concat(todoName))
    }

    return <React.Fragment>
        <input onChange={inputChangeHandler} value={todoName} type="text" plcaeholder="Todo" />
        <button onClick={todoAddHandler} type="button">Add</button>
        <ul>
            {todoList.map(todo => <li key={todo}>{todo}</li>)}
        </ul>
    </React.Fragment>;
}

export default todo;