import React, { useState, useEffect, useRef } from "react";
import "../styles/Todo.css";
import { getTasks, addTask, deleteTask } from "./api";

function Todo() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const inputRef = useRef(null);

    // fetch tasks from the backend
    useEffect(() => {
        getTasks()
        .then(response => {
            setTodos(response.data); // update the state with the fetched tasks
            setLoading(false);  
        })
        .catch(error => {
            console.error("Error fetching tasks: ", error);
            setError("Error fetching tasks: " + error.message);
            setLoading(false);
        });
    }, []);

    const addTodo = async () => {
        if (newTodo) {
            try {
                const response = await addTask({ title: newTodo, done: false });
                setTodos([...todos, response.data]);
                setNewTodo("");
                inputRef.current.focus(); // focus on the input after adding a task
            } catch (error) {
                setError("Error adding task: " + error.message);
            } // <-- Missing closing brace added here
        }
    };

    const removeTodo = async (id) => {
        try {
            await deleteTask(id);
            setTodos(todos.filter((todo) => todo.id !== id));
        } catch (error) {
            setError("Error removing task: " + error.message);
        }
    };
    
    if (loading) return <div>Loading Tasks...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="Todo">
            <h1>Todo List</h1>
            <input
                ref={inputRef}
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
            />
            <button className="add" onClick={() => addTodo()}>Add</button>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <span>{todo.title}</span>
                        <button className="remove" onClick={() => removeTodo(todo.id)}>Remove</button> 
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Todo;
