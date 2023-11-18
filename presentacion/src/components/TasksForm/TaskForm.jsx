import React, { useEffect, useState } from 'react';
import { Form, Formik } from "formik";
import './TaskForm.css';
import { useTasks } from '../../context/Context.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'

const TaskForm = () => {
  const navigate = useNavigate();
  const { createTask, getTask, updateTask } = useTasks();

  const [dateDifference, setDateDifference] = useState(0);

  const [task, setTask] = useState({
    nombre: "",
    descripcion: "",
    fecha_inicio: "",
    fecha_final: "",
    tipo: "",
    archivo: null,
  });

  const params = useParams();


  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        setTask({
          nombre: task.nombre,
          descripcion: task.descripcion,
          fecha_inicio: task.fecha_inicio,
          fecha_final: task.fecha_final,
          tipo: task.tipo,
          archivo: null,
        });
      }
    };
    loadTask();
  }, [params.id, getTask]);

  const calculateDateDifference = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInTime = end.getTime() - start.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays;
  };


  return (
    <div>
      <Formik
        initialValues={task}
        enableReinitialize={true}
        validate={(values) => {
          const validationErrors = {};

          if (!values.nombre) {
            validationErrors.nombre = "El nombre es obligatorio.";
          } else if (values.nombre.length > 45) {
            validationErrors.nombre = "El nombre no debe tener más de 45 caracteres.";
          }

          if (!values.fecha_inicio) {
            validationErrors.fecha_inicio = "La fecha de inicio es obligatoria.";
          } else {
            const currentDate = new Date();
            const startDate = new Date(values.fecha_inicio);

            if (startDate < currentDate) {
              validationErrors.fecha_inicio = "La fecha de inicio no puede ser anterior a la fecha actual.";
            }
          }

          if (!values.fecha_final) {
            validationErrors.fecha_final = "La fecha de finalización es obligatoria.";
          } else if (values.fecha_inicio && new Date(values.fecha_final) < new Date(values.fecha_inicio)) {
            validationErrors.fecha_final = "La fecha de finalización no puede ser anterior a la fecha de inicio.";
          }

          if (!values.tipo) {
            validationErrors.tipo = "El tipo es obligatorio.";
          }

          if (values.descripcion.length > 300) {
            validationErrors.descripcion = "La descripción no debe tener más de 300 caracteres.";
          }

          return validationErrors;
        }}
        onSubmit={async (values, actions) => {
          console.log(values);
          

          if (params.id) {

            toast.success("Actividad actualizada con éxito");
            await updateTask(params.id, values);

            navigate('/dashboard');
          } else {
            await createTask(values);
            toast.success("Actividad creada con éxito");
          }

          // Calcula la diferencia en días y actualiza el estado
          const startDate = values.fecha_inicio;
          const endDate = values.fecha_final;
          const difference = calculateDateDifference(startDate, endDate);
          setDateDifference(difference);


          setTask({
            nombre: "",
            descripcion: "",
            fecha_inicio: "",
            fecha_final: "",
            tipo: "",
            archivo: null,
          });
          actions.resetForm();
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting, errors }) => (
          <Form onSubmit={handleSubmit}>
            <ToastContainer position="bottom-center" />
            <h1>
              {params.id ? "Editar Actividad" : "Agregar Actividad"}
            </h1>

            <label>Nombre</label>
            <input type="text" name="nombre" onChange={handleChange} value={values.nombre} />
            {errors.nombre && <div className="error-message">{errors.nombre}</div>}

            <label>Descripción</label>
            <textarea name="descripcion" onChange={handleChange} value={values.descripcion}></textarea>
            {errors.descripcion && <div className="error-message">{errors.descripcion}</div>}

            <label>Fecha de inicio</label>
            <input type="date" name="fecha_inicio" onChange={handleChange} value={values.fecha_inicio} />
            {errors.fecha_inicio && <div className="error-message">{errors.fecha_inicio}</div>}

            <label>Fecha finalización</label>
            <input type="date" name="fecha_final" onChange={handleChange} value={values.fecha_final} />
            {errors.fecha_final && <div className="error-message">{errors.fecha_final}</div>}

            <label>Tipo</label>
            <select name="tipo" onChange={handleChange} value={values.tipo}>
              <option value="">Selecciona un tipo</option>
              <option value="curso">Curso</option>
              <option value="certificación">Certificación</option>
              <option value="libros">Libros</option>
              <option value="Unidad de retorno">Unidad de retorno</option>
            </select>
            {errors.tipo && <div className="error-message">{errors.tipo}</div>}

          
            <button type="submit" className='submit' style={{fontSize:"1.5em", color:"white"}}>
            {isSubmitting ? <span>Guardando... <FontAwesomeIcon icon={faFloppyDisk} /></span> : <span><FontAwesomeIcon icon={faFloppyDisk} /></span>}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TaskForm;
