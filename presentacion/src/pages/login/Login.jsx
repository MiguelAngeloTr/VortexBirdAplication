import React from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'


const Login = () => {


  const navigate = useNavigate();


  const [credenciales, setCredenciales] = useState({
    email: '',
    password: '',
  })


  const handleChange = (e) => {
    const { name, value } = e.target;
   
    setCredenciales({
      ...credenciales,
      [name]: value,
    })
  }

  
  const handleSubmit = (e) => {
    navigate('/dashboard')
    e.preventDefault();
    axios.post('http://localhost:4000/api/login', {credenciales})
        .then(({data}) => {
      console.log(data);
    })
    .catch(({response}) => {
      console.log(response);
    })
  }




  return (
    <>
      <div className="container">
        <div className="image-container">
        </div>
        <div className="container">
          <form onSubmit={handleSubmit} >
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


              <labelForgotPassword for="ForgotPsw"><b>¿Forgot Password?</b></labelForgotPassword>

              <button id="myButton" type='submit' >Login</button>
            </div>
          </form>
        </div>

      </div >
    </>
  )
}

export default Login