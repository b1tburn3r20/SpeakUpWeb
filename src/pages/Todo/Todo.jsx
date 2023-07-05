import React, { useState } from 'react';
import axios from 'axios';

const Todo = () => {
    const [todoData, setTodoData] = useState({
        title: '',
        description: '',
        dueDate: '',
    });

    const handleInputChange = (event) => {
        setTodoData({
            ...todoData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/todos', todoData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Create Todo</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={todoData.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={todoData.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Due Date:</label>
                    <input
                        type="date"
                        name="dueDate"
                        value={todoData.dueDate}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Create Todo</button>
            </form>
        </div>
    );
};

export default Todo;
