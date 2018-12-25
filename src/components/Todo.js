import React, { useState, useEffect } from 'react';
import axios from 'axios';

import fireBase from '../config/keys';

const todo = props => {
    const [todoName, setTodoName] = useState('');
    const [todoList, setTodoList] = useState([]);


    useEffect(() => {
        axios.get(fireBase).then(response => {
            console.log(response);
            const todoData = response.data;
            const todos = [];
            for (const key in todoData) {
                todos.push({ id: key, name: todoData[key].name })
            }
            setTodoList(todos);
        })
        return () => {
            console.log('Cleanup')
        }
    }, [todoName]);

    const mouseMoveHandler = event => {
        console.log(event.clientX, event.clientY);
    }

    useEffect(() => {
        document.addEventListener('mousemove', mouseMoveHandler);
        return () => {
            document.removeEventListener('mousemove', mouseMoveHandler);
        }
    }, []);

    const inputChangeHandler = (event) => {
        setTodoName(event.target.value);
    };

    const todoAddHandler = () => {
        setTodoList(todoList.concat(todoName))
        axios.post(fireBase, { name: todoName })
            .then(res => { console.log(res) })
            .catch(err => { console.log(err) })
    }

    return <React.Fragment>
        <input onChange={inputChangeHandler} value={todoName} type="text" plcaeholder="Todo" />
        <button onClick={todoAddHandler} type="button">Add</button>
        <ul>
            {todoList.map(todo => <li key={todo.id}>{todo.name}</li>)}
        </ul>
    </React.Fragment>;
}

export default todo;