import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptop, faGamepad, faBook, faDumbbell, faPaintBrush, faUtensils, faBicycle } from '@fortawesome/free-solid-svg-icons';
import './PerRecompensa.css';
import { useTasks } from '../../context/Context';

const PerRecompensa = () => {

  const { rewards, toggleRewardDoneTecnologia, toggleRewardDonevideojuegos, toggleRewardDoneLibros, toggleRewardDoneSalud, toggleRewardDoneArte, toggleRewardDoneAlimentacion, loadReward } = useTasks()

  useEffect(() => {
    loadReward();
  }, []);

  // Cambiar estado/preferencia Tecnologia 
  const handleEstadoTecnologia = async (rewardId) => {
    await toggleRewardDoneTecnologia(rewardId);
  }

  // Cambiar estado/preferencia Videojuegos
  const handleEstadoVidejuego = async (rewardId) => {
    await toggleRewardDonevideojuegos(rewardId);
  }

  // Cambiar estado/preferencia Libros
  const handleEstadoLibro = async (rewardId) => {
    await toggleRewardDoneLibros(rewardId);
  }

  // Cambiar estado/preferencia Salud
  const handleEstadoSalud = async (rewardId) => {
    await toggleRewardDoneSalud(rewardId);
  }

  // Cambiar estado/preferencia Arte
  const handleEstadoArte = async (rewardId) => {
    await toggleRewardDoneArte(rewardId);
  }

  // Cambiar estado/preferencia Alimentacion
  const handleEstadoAlimentacion = async (rewardId) => {
    await toggleRewardDoneAlimentacion(rewardId);
  }


  return (
    <>
    

      {rewards.map((reward, index) => (
        <div key={index}>
          <div className="card-container">
            <div className="card">
              <div className="card-content">
                <input
                  className="checkbox"
                  type='checkbox'
                  checked={reward.flagTecnologia === 1}
                  onClick={() => handleEstadoTecnologia(reward.id)}
                />
                <div className="icon-container">
                  <FontAwesomeIcon icon={faLaptop} size="2x" className="tech-icon" />
                </div>
                <h2 className="card-title">Tecnología</h2>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <input
                  className="checkbox"
                  type='checkbox'
                  checked={reward.flagVideojuegos === 1}
                  onClick={() => handleEstadoVidejuego(reward.id)}
                />
                <div className="icon-container">
                  <FontAwesomeIcon icon={faGamepad} size="2x" className="tech-icon" />
                </div>
                <h2 className="card-title">Videojuegos</h2>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <input
                  className="checkbox"
                  type='checkbox'
                  checked={reward.flagLibros === 1}
                  onClick={() => handleEstadoLibro(reward.id)}
                />
                <div className="icon-container">
                  <FontAwesomeIcon icon={faBook} size="2x" className="tech-icon" />
                </div>
                <h2 className="card-title">Libros y Educación</h2>
              </div>
            </div>
          </div>

          <div className="card-container">
            <div className="card">
              <div className="card-content">
                <input
                  className="checkbox"
                  type='checkbox'
                  checked={reward.flagGimnasio === 1}
                  onClick={() => handleEstadoSalud(reward.id)}
                />
                <div className="icon-container">
                  <FontAwesomeIcon icon={faDumbbell} size="2x" className="tech-icon" />
                </div>
                <h2 className="card-title">Gimnasio y Salud</h2>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <input
                  className="checkbox"
                  type='checkbox'
                  checked={reward.flagArte === 1}
                  onClick={() => handleEstadoArte(reward.id)}
                />
                <div className="icon-container">
                  <FontAwesomeIcon icon={faBicycle} size="2x" className="tech-icon" />
                </div>
                <h2 className="card-title">Ciclismo</h2>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <input
                  className="checkbox"
                  type='checkbox'
                  checked={reward.flagAlimentacion === 1}
                  onClick={() => handleEstadoAlimentacion(reward.id)}
                />
                <div className="icon-container">
                  <FontAwesomeIcon icon={faUtensils} size="2x" className="tech-icon" />
                </div>
                <h2 className="card-title">Alimentación y Restaurantes</h2>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PerRecompensa;
