import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import Sidebar from '../../components/sidebar/Sidedar';
import { useTasks } from '../../context/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './ConsultaActividad.css'

const ConsultaActividad = () => {
  const { getTasksById, tasks, loadTasks } = useTasks();
  const [id, setId] = useState({
    fk_id_login: ''
  });

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="container-fluid">

      <div className="row">
      
        <div className="col-md-3">
        
        
          {/* Sidebar component */}
          <Sidebar />
        </div>
        <div className="col-md-9">
          
          {/* Formik form for activity search */}
          <Formik
            initialValues={id}
            enableReinitialize={true}
            onSubmit={async (values, actions) => {
              await getTasksById(values);
              setId({
                fk_id_login: ''
              });
            }}
          >
            
            {({ handleChange, handleSubmit, values }) => (
              <Form
                onSubmit={handleSubmit}
                className="form-inline"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start'
                }}
              >
                <label className="mr-2">Revisar avance de un colaborador:</label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                
                  <input
                    type="text"
                    className="form-control mr-2"
                    placeholder="Nombre del colaborador"
                    name="fk_id_login"
                    onChange={handleChange}
                    value={values.fk_id_login}
                    style={{ height: '50px' }}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ backgroundColor: '#F27C38', marginLeft: '10px' }}
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <div className="task-column">
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre Actividad</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={index}>
                    <td>{task.nombre}</td>
                    <td>{task.estado === 1 ? "Completado" : "Pendiente"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultaActividad;