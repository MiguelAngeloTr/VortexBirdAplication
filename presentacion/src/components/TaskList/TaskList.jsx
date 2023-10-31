import React, { useEffect, useState } from 'react';
import './TaskList.css';
import TaskForm from '../TasksForm/TaskForm.jsx';
import { useTasks } from '../../context/Context.jsx';
import {  useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal.js';
import Files from '../../pages/Files/Files'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import Evidencia from '../Evidencias/Evidencia';
import DetalleTask from '../DetalleTask/DetalleTask';
import { toast, ToastContainer } from 'react-toastify';

const TaskList = () => {
  const [active, setActive] = useState(false);
  const { tasks, loadTasks, deleteTask, toggleTaskDone, evidencias, loadEvidencias } = useTasks();
  const [activeForm, setActiveForm] = useState(false); // Estado para el modal de UnitsForm
  const [activeEvidencia, setactiveEvidencia] = useState(false); // Estado para el modal de evidencias

  const [activeTaskId, setActiveTaskId] = useState(null);
  const [activeEvidenciakId, setActiveEvidenciaId] = useState(null);

  const [activeDetalle, setActiveDetalle] = useState(false); // Estado para el modal de los detalles de las actividades

  //pasar id al componente DetalleTask
  const [detalleTaskId, setDetalleTaskId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadTasks();
    loadEvidencias();
  }, []);



  const handleEstado = async (taskId) => {
    await toggleTaskDone(taskId);

  }

  const toggleForm = (taskId) => {
    setActiveForm(!activeForm);
    setActiveTaskId(taskId);
    
  }


  const toggle = () => {
    setActive(!active);
  }

  const toggleEvidencia = (evidenciaId) => {
    setactiveEvidencia(!activeEvidencia);
    setActiveEvidenciaId(evidenciaId);
  }

  const toggleDetalle = (taskId) => {
    setActiveDetalle(!activeDetalle);
    setDetalleTaskId(taskId);
  }

  // Filtrar tareas pendientes
  const pendingTasks = tasks.filter(task => task.estado !== 1);

  // Filtrar tareas completadas
  const completedTasks = tasks.filter(task => task.estado === 1);

  return (
    <>
     <ToastContainer position="bottom-center" />
      <div className="task-list-container">
        <div className="task-column">
          <div className="task-column-title">
            <h1>Actividades Pendientes</h1>
          </div>
          <div className="task-cards">
            {pendingTasks.length === 0 ? (
              <p>Aun no hay actividades pendientes</p>
            ) : (
              pendingTasks.map((task, index) => (

                <div key={index} className={`task-card ${task.estado === 1 ? 'task-completed' : 'task-pending'}`}>
                  {/* Renderiza la información de la tarea pendiente aquí */}
                  <div className='list-actividad'>
                    <h2>{task.nombre}</h2>
                    <p className='pending-task' >{task.estado === 1 ? "Completado" : "Pendiente"}</p>

                  </div>
                  <div className='icon'>
                    <FontAwesomeIcon onClick={() => toggleForm(task.id)} className='icon' icon={faCheck} size="2x" color="green" />
                    <FontAwesomeIcon onClick={() => navigate(`/edit/${task.id}`)} className='icon' icon={faEdit} size="2x" color="orange" />
                    <FontAwesomeIcon onClick={() => deleteTask(task.id)} className='icon' icon={faTrash} size="2x" color="red" />
                    <FontAwesomeIcon onClick={() => toggleDetalle(task.id)} className="view-button" icon={faEye} size="2x"   />
                  </div>
                </div>

              ))
            )}
            <div className="center-button">
              <button onClick={toggle}>Agregar Tarea</button>
            </div>
          </div>



        </div>

        <div className="task-column">
          <div className="task-column-title">
            <h1>Actividades Completadas</h1>
          </div>
          <div className="task-cards">
            {completedTasks.length === 0 ? (
              <p>No hay actividades completadas</p>
            ) : (
              completedTasks.map((task, index) => (
                <div key={index} className="task-card">
                  {/* Renderiza la información de la tarea completada aquí */}
                  <div className='list-actividad'>
                    <h2>{task.nombre}</h2>
                    <p className='completed-task' >{task.estado === 1 ? "Completado" : "Pendiente"}</p>
                    <h6 className='pointer' onClick={() => toggleEvidencia()} > Ver evidencia </h6>
                  </div>
                  {/*<button onClick={() => handleEstado(task.id)}>Marcar</button>*/}

                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <Modal active={activeDetalle } toggle={toggleDetalle}>
        <DetalleTask detalleTaskId={detalleTaskId} />
        <button className="btn btn-danger" onClick={toggleDetalle}>Cerrar</button>
      </Modal>





      <Modal active={activeEvidencia} toggle={toggleEvidencia}>
        <Evidencia activeEvidenciakId={activeEvidenciakId} />
        <button className="btn btn-danger" onClick={toggleEvidencia}>Cerrar</button>
      </Modal>

      <Modal active={activeForm} toggle={toggleForm}>
        <Files activeTaskId={activeTaskId} />
        <button className="btn btn-danger" onClick={toggleForm}>Cerrar</button>
      </Modal>


      <Modal active={active} toggle={toggle}>
        <TaskForm />
        <button className="btn btn-danger" onClick={toggle}>
          Cerrar
        </button>
      </Modal>

    </>
  );
}

export default TaskList;
