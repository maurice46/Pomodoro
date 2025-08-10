import axios from 'axios';

// instance of axios with base URL 
const instance = axios.create(
    {
        baseURL: 'http://127.0.0.1:5000/', // flask backend url
    }
);

export const getTasks = () => instance.get('/tasks'); // get all tasks
export const addTask = (task) => instance.post('/tasks', task); // add task
export const deleteTask = (id) => instance.delete(`/tasks/${id}`); // delete task by id

export default instance;
