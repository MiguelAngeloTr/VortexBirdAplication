import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [credenciales, setCredenciales] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const usuarios = [
    {
      email: 'prueba@gmail.com',
      password: '1234',
    },

  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCredenciales({
      ...credenciales,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const usuario = usuarios.find(
      (user) =>
        user.email === credenciales.email && user.password === credenciales.password
    );

    if (usuario) {
      navigate('/dashboard');
    } else {
      setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <>
      <div className="container">
        <div className="image-container"></div>
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="login-container">
              <h2>Iniciar Sesión</h2>

              <labelUser for="email"><b>Email</b></labelUser>
              <input
                type="text"
                placeholder="Ingresa Email"
                value={credenciales.email}
                onChange={handleChange}
                name="email"
              />

              <labelPassword for="password"><b>Contraseña</b></labelPassword>
              <input
                type="password"
                placeholder="Ingresa Contraseña"
                value={credenciales.password}
                onChange={handleChange}
                name="password"
              />

              {error && <p className="error-message">{error}</p>}

              <button className="boton-login" id="myButton" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
