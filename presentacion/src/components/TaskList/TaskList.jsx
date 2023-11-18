import React, { useEffect, useState } from 'react';
import './TaskList.css';
import TaskForm from '../TasksForm/TaskForm.jsx';
import { useTasks } from '../../context/Context.jsx';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal.js';
import Files from '../../pages/Files/Files'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import Evidencia from '../Evidencias/Evidencia';
import DetalleTask from '../DetalleTask/DetalleTask';
import { toast, ToastContainer } from 'react-toastify';
import moment from 'moment';

const TaskList = () => {
  const [active, setActive] = useState(false);
  const { tasks, loadTasks, deleteTask, toggleTaskDone, evidencias, loadEvidencias, points, users } = useTasks();
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

  const calculateProgress = (startDate, endDate) => {
   
    const now = moment();
    const start = moment(startDate);
    const end = moment(endDate);

    const totalMilliseconds = end.diff(start);
    const elapsedMilliseconds = now.diff(start);

    const progress = (elapsedMilliseconds / totalMilliseconds) * 100;

    return Math.round(Math.max(0, Math.min(progress, 100))); // Redondea el resultado y asegura que esté entre 0 y 100
  };


  
  return (
    <>
      <h1>Bienvenido {users.nombre_usuario}</h1>
      <ToastContainer position="bottom-center" />
      <div className="col-12 main-container">
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
           
           
                     
                      {/*barra de progreso*/}
                      <progress value={String(calculateProgress(task.fecha_inicio, task.fecha_final))} max="100"></progress>
                    </div>
                    <div className='icon'>
                      <FontAwesomeIcon onClick={() => toggleForm(task.id)} className='icon' icon={faCheck} size="2x" color="green" title='Completar Actividad' />
                      <FontAwesomeIcon onClick={() => navigate(`/edit/${task.id}`)} className='icon' icon={faEdit} size="2x" color="orange" title='Editar Actividad' />
                      <FontAwesomeIcon onClick={() => deleteTask(task.id)} className='icon' icon={faTrash} size="2x" color="red" title='Eliminar Actividad' />
                      <FontAwesomeIcon onClick={() => toggleDetalle(task.id)} className="view-button" icon={faEye} size="2x" title='Detalles de la Actividad' />
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

        {/*<div className='col-1'>
          <div className='clasificacion'>
            <div class="card-level">
              <div class="img">
                <img src="./perfil.png" alt="" />
              </div>
              <div class="content-logro">
                {points.map((point, index) => (
                  <div key={index}>
                    <h2 className='text-center'>Alvaro</h2>
                    <h6>Puntos actuales del plan carrera </h6>
                    <h3 className='puntos'>{point.cantidad_puntos}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
                </div>*/}

      </div>

      <Modal active={activeDetalle} toggle={toggleDetalle}>
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
