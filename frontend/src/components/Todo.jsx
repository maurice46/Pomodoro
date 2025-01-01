import React, { useState, useEffect, useRef } from "react";
import "../styles/Todo.css";

function Todo() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const inputRef = useRef(null);

    const addTodo = () => {
        if (newTodo) {
            setTodos([...todos, newTodo]);
            setNewTodo("");
            inputRef.current.focus();
        }
    };

    const removeTodo = (index) => {
        setTodos(todos.filter((_, i) => i !== index));
    };

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <div className="Todo">
            <h1>Todo List</h1>
            <input
                ref={inputRef}
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
            />
            <button className="add" onClick={addTodo}>Add</button>
            <ul>
                {todos.map((todo, i) => (
                    <li key={i}>
                        <span>{todo}</span>
                        <button className="remove" onClick={() => removeTodo(i)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Todo;
