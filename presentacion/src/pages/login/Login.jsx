import React, { useState } from 'react';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';
import { useTasks } from '../../context/Context';
import { Formik, Form, ErrorMessage } from 'formik';



const Login = () => {

  const { loginUser } = useTasks()

  const navigate = useNavigate()

  const [usuario, setUsuario] = useState({
    email: "",
    password: "",

  });

  const [error, setError] = useState(null);

  return (
    <>
      <div>
        <Formik
          initialValues={usuario}
          enableReinitialize={true}
          onSubmit={async (values, actions) => {
            // Verificar campos vacíos
            if (!values.email || !values.password) {
              actions.setFieldError('email', 'Campo obligatorio');
              actions.setFieldError('password', 'Campo obligatorio');
              return;
            }

             
              console.log(values);
              await loginUser(values);


              navigate("/dashboard");
              setUsuario({
                email: "",
                password: ""
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
                        <h1 className='text-center'> ¡Bienvenido! </h1>
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
                        {error && <div className="text-danger">{error}</div>}

                      </div>
                      <div className="form-group d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-primary w-50"
                          style={{ backgroundColor: '#F27C38' }}

                        > <FontAwesomeIcon icon={faSignInAlt} /> Ingresar</button>

                      </div>
                      <div className='centro'>
                        <Link to='/registro' >Registrate</Link>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div >
    </>
  );
};

export default Login;
