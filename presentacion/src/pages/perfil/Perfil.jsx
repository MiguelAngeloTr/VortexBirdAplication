import React, { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidedar';
import './Perfil.css';
import { useTasks } from '../../context/Context';

const Perfil = () => {

  const { rewards, loadReward ,users} = useTasks()




  return (
    <div className="perfil-container">
      <Sidebar />
      <div className="container">
        <div id="informacion-empleado" className="info-section">
          <h1 id="titulo-infocolab1" className="info-title">Información básica del empleado/a</h1>
          <div id="informacion-basica" className="info-content">
            <form style={{ marginTop: "0px" }} id="formulario-info">
              <ul>
                <li className="li-perfil">
                  <label className="label-perfil" htmlFor="cargo">Cargo</label>
                  <input className="campo-perfil" type="text" value={"Desarrollador Junior"} id="campo-cargo" disabled></input>
                </li>
                <li className="li-perfil">
                  <label className="label-perfil" htmlFor="nacionalidad">Nacionalidad</label>
                  <input className="campo-perfil" type="text" value={"Colombiano"} id="campo-nacionalidad" disabled></input>
                </li>
                <li className="li-perfil">
                  <label className="label-perfil" htmlFor="pais">País de residencia</label>
                  <input className="campo-perfil" type="text" value={"Colombia"} id="campo-apellidos" disabled></input>
                </li>
                <li className="li-perfil">
                  <label className="label-perfil" htmlFor="ciudad">Ciudad de residencia</label>
                  <input className="campo-perfil" type="text" value={"Cali"} id="campo-ciudad" disabled></input>
                </li>
              </ul>
            </form>
          </div>
          <h1 id="titulo-infocolab2" className="info-title">Información de contacto</h1>
          <div id="informacion-contacto" className="info-content">
            <form style={{ marginTop: "0px" }} id="formulario-info">
              <ul>
                <li className="li-perfil">
                  <label className="label-perfil" htmlFor="email">E-mail</label>
                  <input className="campo-perfil" type="text" value={users.email} id="campo-email" disabled></input>
                </li>
                <li className="li-perfil">
                  <label className="label-perfil" htmlFor="numero_telefono">Teléfono 1</label>
                  <input className="campo-perfil" type="text" value={"3146897745"} id="campo-telefono1" disabled></input>
                </li>
                <li className="li-perfil">
                  <label className="label-perfil" htmlFor="numero_telefono2">Teléfono 2</label>
                  <input className="campo-perfil" type="text" value={"No posee"} id="campo-telefono2" disabled></input>
                </li>
              </ul>
            </form>
          </div>
          <h1 id="titulo-infocolab3" className="info-title">Información de estudios y certificados</h1>
          <div id="informacion-estudios" className="info-content">
            <form style={{ marginTop: "0px" }} id="formulario-info">
              <ul>
                <label className="label-perfil" htmlFor="nombre">Estudio</label>
                <li className="li-perfil">
                  <input className="campo-perfil" type="text" value={"Ingenieria Informatica"} disabled></input>
                </li>
              </ul>
            </form>
          </div>
        </div>







        <div id="informacion-ol" className="info-section">
          <div className="foto-container">
            <img
              width="50%"
              src="./perfil.png"
              alt="foto de perfil"
              id="foto-ol"
            />
          </div>
          <div>
            <h1 id="nombre-completo">{users.nombre_usuario}</h1>
            <form id="formulario-ol">
              <ul>
                {rewards.every(reward => (
                  reward.flagTecnologia === 0 &&
                  reward.flagVideojuegos === 0 &&
                  reward.flagLibros === 0 &&
                  reward.flagGimnasio === 0 &&
                  reward.flagArte === 0 &&
                  reward.flagAlimentacion === 0
                )) ? (
                  <p>Sin preferencias</p>
                ) : (
                  rewards.map((reward, index) => (
                    <li key={index} className="li-perfil">
                      <label className="label-perfil" htmlFor="años_experiencia">Preferencias</label>
                      {reward.flagTecnologia === 1 && <p>Tecnología</p>}
                      {reward.flagVideojuegos === 1 && <p>Video Juegos</p>}
                      {reward.flagLibros === 1 && <p>Libros y Educación</p>}
                      {reward.flagGimnasio === 1 && <p>Gimnasio y Salud</p>}
                      {reward.flagArte === 1 && <p>Ciclismo</p>}
                      {reward.flagAlimentacion === 1 && <p>Alimentación y Restaurantes</p>}
                    </li>
                  ))
                )}
                <li className="li-perfil">
                  <label className="label-perfil" htmlFor="años_experiencia">Años de experiencia</label>
                  <input className="campo-perfil" type="number" value={"5"} id="campo-experiencia" disabled></input>
                </li>
                <li className="li-perfil">
                  <label className="label-perfil" htmlFor="correo_ol">Correo laboral</label>
                  <input className="campo-perfil" type="email" value={"Alvaro@vortex.co"} id="campo-correo-ol" disabled></input>
                </li>
                <li className="li-perfil">
                  <label className="label-perfil" htmlFor="fecha_contratacion">Fecha de contratación</label>
                  <input className="campo-perfil" type="text" value={"25/10/2017"} id="campo-fecha-contratacion" disabled></input>
                </li>
                <li className="li-perfil">
                  <label className="label-perfil" htmlFor="contenido">Observaciones</label>
                </li>
              </ul>
            </form>
            <div id="observacion" className="observation">
              <textarea value={"Apasionado por la programación"} type="text" rows={10} readOnly={true}></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
