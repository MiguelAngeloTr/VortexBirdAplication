import React, { useState } from 'react';

import './Dashboard.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInputTodo, setTaskInputTodo] = useState('');
  const [taskInputInProgress, setTaskInputInProgress] = useState('');
  const [taskInputCompleted, setTaskInputCompleted] = useState('');

  const addTask = (taskText, taskInputSetter) => {
    if (taskText.trim() === '') {
      return; // No se permite agregar tareas vacías
    }

    const newTask = {
      id: new Date().getTime(),
      text: taskText,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    taskInputSetter('');
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  // Función para modificar una tarea por su ID
  const modifyTask = (taskId, newText) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, text: newText };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="contenedor">
      <h2 className="Dashboard">Dashboard</h2>
      <div className="ListaTareas" id="ListaTareas">
        <h3>Lista Tareas</h3>
        <input
          type="text"
          placeholder="Nueva tarea"
          value={taskInputTodo}
          onChange={(e) => setTaskInputTodo(e.target.value)}
        />
        <button onClick={() => addTask(taskInputTodo, setTaskInputTodo)}>
          Agregar tarea
        </button>
        <ul>
          {tasks
            .filter((task) => !task.completed)
            .map((task) => (
              <li key={task.id}>
                <button>{task.text}</button>
                <button onClick={() => deleteTask(task.id)}>Eliminar</button>
                <button
                  onClick={() =>
                    modifyTask(task.id, prompt('Modificar tarea:', task.text))
                  }
                >
                  Modificar
                </button>
              </li>
            ))}
        </ul>
      </div>
      <div className="EnProgreso" id="EnProgreso">
        <h3>En progreso</h3>
        <input
          type="text"
          placeholder="Nueva tarea"
          value={taskInputInProgress}
          onChange={(e) => setTaskInputInProgress(e.target.value)}
        />
        <button onClick={() => addTask(taskInputInProgress, setTaskInputInProgress)}>
          Agregar tarea
        </button>
        <ul>
          {tasks
            .filter((task) => task.completed && !task.deleted)
            .map((task) => (
              <li key={task.id}>
                <button>{task.text}</button>
                <button onClick={() => deleteTask(task.id)}>Eliminar</button>
                <button
                  onClick={() =>
                    modifyTask(task.id, prompt('Modificar tarea:', task.text))
                  }
                >
                  Modificar
                </button>
              </li>
            ))}
        </ul>
      </div>
      <div className="Completadas">
        <h3>Completadas</h3>
        <input
          type="text"
          placeholder="Nueva tarea"
          value={taskInputCompleted}
          onChange={(e) => setTaskInputCompleted(e.target.value)}
        />
        <button
          onClick={() => addTask(taskInputCompleted, setTaskInputCompleted)}
        >
          Agregar tarea
        </button>
        <ul>
          {tasks
            .filter((task) => task.completed && task.deleted)
            .map((task) => (
              <li key={task.id}>
                <button>{task.text}</button>
                <button onClick={() => deleteTask(task.id)}>Eliminar</button>
                <button
                  onClick={() =>
                    modifyTask(task.id, prompt('Modificar tarea:', task.text))
                  }
                >
                  Modificar
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;