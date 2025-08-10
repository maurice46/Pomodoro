import { useState, useEffect, useRef } from "react";
import "../styles/Todo.css";
import { getTasks, addTask, deleteTask } from "./api";

function Todo() {
    const [todos, setTodos] = useState([]); // array to hold tasks fetched from the backend
    const [newTodo, setNewTodo] = useState(""); // string to hold the new task input by the user
    const [loading, setLoading] = useState(true); // indicate if the tasks are being fetched from the backend
    const [error, setError] = useState(null); // string to hold any error message if the tasks cannot be fetched 
    const inputRef = useRef(null); // useRef is used to access the input element directly without causing re-renders

    // useEffect is used to fetch the tasks from the backend when the component mounts
    // components mount means the component is added to the DOM for the first time
    // it runs the function inside it only once when the component is mounted
    useEffect(() => {
        getTasks() // getTasks is a function that fetches the tasks from the backend
        .then(response => {
            setTodos(response.data); // response.data contains the tasks fetched from the backend
            setLoading(false); 
        })
        .catch(error => {
            console.error("Error fetching tasks: ", error);
            setError("Error fetching tasks: " + error.message);
            setLoading(false);
        });
    }, []);

    // async functions are used to handle asynchronous operations like fetching data from the backend
    // async/await is used to handle promises in a more readable way
    const addTodo = async () => {
        if (newTodo) {
            try {
                const response = await addTask({ title: newTodo, done: false });
                setTodos([...todos, response.data]);
                setNewTodo("");
                // inputRef is used to access the input element directly
                // inputRef.current.focus() is used to set the focus on the input element after adding a task
                inputRef.current.focus(); 
            } catch (error) {
                setError("Error adding task: " + error.message);
            } 
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
    
    // if loading is true, show a loading message
    // if error is not null, show the error message
    if (loading) return <div>Loading Tasks...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="Todo">
            <h1>Todo List</h1>
            <input
                // ref is used to access the input element directly
                ref={inputRef}
                type="text"
                value={newTodo}
                // onChange is used to update the newTodo state when the user types in the input field
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
