import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/todos');
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addTodo = async () => {
    if (inputValue.trim() !== '') {
      const newTodo = [inputValue];

      try {
        const response = await axios.post('http://localhost:3000/todos', newTodo);
        setTodos(todos.concat(newTodo));
        setInputValue('');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteTodo = async (index) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${index}`);
      const updatedTodos = [...todos];
      updatedTodos.splice(index, 1);
      setTodos(updatedTodos);
    } catch (error) {
      console.log(error);
    }
  };


  const editTodo = async (index) => {
    setInputValue(todos[index]);
    deleteTodo(index);
  };


  return (
    <div className="container">
      <h1 className="mt-4">Todo List</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add a new todo"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary" onClick={addTodo}>
          <i className="fa fa-plus"></i> Add Todo
        </button>
      </div>
      <ul className="list-group">
        {todos.map((todo, index) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
            {todo}
            <div>
              <button className="btn btn-success" onClick={() => editTodo(index)}>
                <FontAwesomeIcon icon={faEdit} /> Edit
              </button>
              <button className="btn btn-danger" onClick={() => deleteTodo(index)}>
                <FontAwesomeIcon icon={faTrash} /> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
