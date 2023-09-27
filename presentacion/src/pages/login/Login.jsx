import React from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'


const Login = () => {


  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard')
  };

  return (
    <>
      <div className="container">
        <div className="image-container">
        </div>
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="login-container">
              <h2>Iniciar Sesión</h2>

              <labelUser for="uname"><b>Email</b></labelUser>
              <input type="text" placeholder="Ingresa Email" name="uname" required />


              <labelPassword for="psw"><b>Contraseña</b></labelPassword>
              <input type="password" placeholder="Ingresa Contraseña" name="psw" required />


              <labelForgotPassword for="ForgotPsw"><b>¿Forgot Password?</b></labelForgotPassword>

              <button id="myButton" type="submit">Login</button>
            </div>
          </form>
        </div>

      </div >
    </>
  )
}

export default Login