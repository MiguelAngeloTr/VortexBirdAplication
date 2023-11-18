import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, ErrorMessage } from 'formik';
import { useTasks } from '../../context/Context';

const Registro = () => {

    const { createUser } = useTasks()

    const navigate = useNavigate()

    const [usuario, setUsuario] = useState({
        email: "",
        password: "",
        nombre_usuario: ""

    });

    return (
        <>
            <div>
                <Formik
                    initialValues={usuario}
                    enableReinitialize={true}
                    onSubmit={async (values, actions) => {
                        //verificar campos vacios
                        if (!values.email || !values.password || !values.nombre_usuario) {
                            actions.setFieldError('email', 'Campo obligatorio');
                            actions.setFieldError('password', 'Campo obligatorio');
                            actions.setFieldError('nombre_usuario', 'Campo obligatorio');
                            return;
                        }

                        console.log(values);
                        await createUser(values);

                        navigate("/dashboard");
                        setUsuario({
                            email: "",
                            password: "",
                            nombre_usuario: ""
                        });
                    }}
                >
                    {({ handleChange, handleSubmit, values }) => (
                        <Form onSubmit={handleSubmit}>
                            <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm">
                                            <img src="./oficina.png" alt="Imagen descriptiva" className="img-fluid" />
                                        </div>
                                        <div className="col-sm d-flex flex-column justify-content-center">

                                            <div className="form-group">
                                                <h1 className='text-center'> Registro </h1>
                                                <label htmlFor="email">Correo electrónico:</label>
                                                <input
                                                    type="email"
                                                    className="form-control "
                                                    placeholder="Ingresa tu correo electrónico"
                                                    name="email"
                                                    onChange={handleChange}
                                                    value={values.email}
                                                    style={{ height: '50px' }} />
                                                <ErrorMessage name="email" component="div" className="text-danger" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="password">Nombre completo:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Ingresa tu nombre"
                                                    name="nombre_usuario"
                                                    onChange={handleChange}
                                                    value={values.nombre_usuario}
                                                    style={{ height: '50px' }}
                                                />
                                                <ErrorMessage name="nombre_usuario" component="div" className="text-danger" />

                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="password">Contraseña:</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Ingresa tu contraseña"
                                                    name="password"
                                                    onChange={handleChange}
                                                    value={values.password}
                                                    style={{ height: '50px' }}
                                                />
                                                <ErrorMessage name="password" component="div" className="text-danger" />

                                            </div>
                                            <div className="form-group d-flex justify-content-center">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary w-50"
                                                    style={{ backgroundColor: '#F27C38' }}

                                                > <FontAwesomeIcon icon={faSignInAlt} /> Regsitrarse</button>

                                            </div>
                                            <div className='centro'>
                                                <Link to='/' >Ya tengo una cuenta</Link>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}

export default Registro