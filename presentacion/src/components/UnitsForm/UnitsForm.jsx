import React, { useState, useEffect } from 'react'
import { Form, Formik } from "formik";
import { useTasks } from '../../context/Context.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const UnitsForm = () => {

    const navigate = useNavigate();
    const { createUnit, updateUnit, getUnit } = useTasks();
    const [errors, setErrors] = useState({});

    const [unit, setUnit] = useState({
        nombre: "",
        objetivo: "",
        descripcion: "",
        fecha: "",
        archivo: "",
    })

    const params = useParams();

    useEffect(() => {
        const loadUnits = async () => {
            if (params.id) {
                const unit = await getUnit(params.id);
                console.log(unit);
                setUnit({
                    nombre: unit.nombre,
                    objetivo: unit.objetivo,
                    descripcion: unit.descripcion,
                    fecha: unit.fecha,
                    archivo: null
                });
            }
        };
        loadUnits();
    }, [params.id, getUnit]);



    return (
        <>
            <div>
                <Formik
                    initialValues={unit}
                    enableReinitialize={true}
                    validate={(values) => {
                        const validationErrors = {};

                        if (!values.nombre) {
                            validationErrors.nombre = "El nombre es obligatorio.";
                        } else if (values.nombre.length > 45) {
                            validationErrors.nombre = "El nombre no debe tener más de 45 caracteres.";
                        }

                        if (!values.objetivo) {
                            validationErrors.objetivo = "El objetivo es obligatorio.";
                        } else if (values.objetivo.length > 45) {
                            validationErrors.objetivo = "El objetivo no debe tener más de 45 caracteres.";
                        }

                        if (!values.fecha) {
                            validationErrors.fecha = "La fecha es obligatoria.";
                        }

                        if (values.descripcion.length > 300) {
                            validationErrors.descripcion = "La descripción no debe tener más de 300 caracteres.";
                        }

                        setErrors(validationErrors);
                        return validationErrors;
                    }}
                    onSubmit={async (values, actions) => {
                        console.log(values);
                        if (params.id) {
                            await updateUnit(params.id, values);
                            navigate('/retorno');
                        } else {
                            await createUnit(values);
                            toast.success("Unidad creada con éxito");
                        }
                        setUnit({
                            nombre: "",
                            objetivo: "",
                            descripcion: "",
                            fecha: "",
                            archivo: null,
                        });
                        actions.resetForm();
                    }}
                >
                    {({ handleChange, handleSubmit, setFieldValue, values, isSubmitting, errors }) => (
                        <Form onSubmit={handleSubmit}>
                            <ToastContainer position="bottom-center" />
                            <label>Título de la unidad de retorno</label>
                            <input type="text" name="nombre" onChange={handleChange} value={values.nombre} />
                            {errors.nombre && <div className="error-message">{errors.nombre}</div>}

                            <label>Objetivo</label>
                            <input type="text" name="objetivo" onChange={handleChange} value={values.objetivo} />
                            {errors.objetivo && <div className="error-message">{errors.objetivo}</div>}

                            <label>Descripción</label>
                            <textarea name="descripcion" onChange={handleChange} value={values.descripcion}></textarea>
                            {errors.descripcion && <div className="error-message">{errors.descripcion}</div>}

                            <label>Fecha</label>
                            <input type="date" name="fecha" onChange={handleChange} value={values.fecha} />
                            {errors.fecha && <div className="error-message">{errors.fecha}</div>}

                            <label>Material de soporte</label>
                            <input type="file" name="archivo" onChange={(e) => setFieldValue("archivo", e.target.files[0])} />

                            <button type="submit">
                                {isSubmitting ? "Guardando..." : "Guardar"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}

export default UnitsForm