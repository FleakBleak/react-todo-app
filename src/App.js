import React from "react";
import { useState, useEffect } from "react";
import './App.css';

function App() {

  const [todos, setTodos] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);

  useEffect(() => {
    if (todos.length > 0) {
      let json = JSON.stringify(todos);
      localStorage.setItem("todos", json);
    }
  }, [todos]);

  useEffect(() => {
    let json = localStorage.getItem("todos");
    let loadedTodos = JSON.parse(json);
    if (loadedTodos){
      setTodos(loadedTodos);
    }
  }, []);
  
  function addTodo(e) {
    e.preventDefault();
    let task = document.getElementById("task").value;
    let newTodo = {
      id: new Date(),
      task: task.trim(),
      completed: false
    };
    if (newTodo.task.length > 0) {
      setTodos([...todos].concat(newTodo));
    }
    else {
      alert("Enter Valid Task");
    }
    document.getElementById('task').value = ""
  }

  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    })
    setTodos(updatedTodos);
  }

  function submitEdits(newtodo) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === newtodo.id) {
        todo.task = document.getElementById(newtodo.id).value;
        }
        return todo;
      });
      setTodos(updatedTodos);
      setTodoEditing(null);
  }
  
  return (
    <div className="todo-container">
      <h1>Todo list</h1>
        <form onSubmit={addTodo} className="todo-from">
          <input type="text" id="task" className="todo-input" placeholder="Add a new task"></input>
          <input type="submit" value="Add" className="todo-submit"></input>
        </form>
        {todos.map((todo) => {
          return(
          <div key={todo.id} className="todo-item">
            {todo.id === todoEditing ? 
            (
            <>
              <input type="text" id={todo.id} defaultValue={todo.task} className="edit-input"></input>
              <br></br>
              <button onClick={() => submitEdits(todo)}  className="submit-button">Submit</button>
            </>
            )
            : 
            (
            <>
              <input type="checkbox" checked={todo.completed} onChange={() => toggleComplete(todo.id)} className="todo-checkbox"></input>
              <span className={todo.completed ? "completed" : ""}>{todo.task}</span>
              <button onClick={() => setTodoEditing(todo.id)} className="edit-button">Edit</button>
              <button onClick={() => deleteTodo(todo.id)} className="delete-button">Delete</button>
            </>
            )
            }
          </div>
          );}
        )}
      </div>
  );
}

export default App;
