
import Sidebar from '../../components/sidebar/Sidedar'
import { useTasks } from '../../context/Context'
import { useEffect, useState } from 'react'
import './Logro.css'


const Logro = () => {


  const { points, loadPoints,  levels, loadLevels, tasks, updateLevel, loadTasks ,users} = useTasks()

  const [currentLevel, setCurrentLevel] = useState(1);

  useEffect(() => {
    loadTasks();
    loadPoints();
    loadLevels();
  }, []);

  const completedTasks = tasks.filter(task => task.estado === 1);

  const nivel = levels.filter(n => n.id === 1 )

  const aumentarNivel = async (idNivel) => {
     await updateLevel(idNivel)
  }

  
  {/*useEffect(() => {
    // Calcula cuántas veces se ha incrementado la cantidad de puntos en 100
    if (points.length > 0) {
      const currentPoints = points[0].cantidad_puntos;
      const pointsNeededForNextLevel = calculateNextLevelPoints(currentLevel);

      if (currentPoints >= pointsNeededForNextLevel) {
        const increaseCount = Math.floor((currentPoints - pointsNeededForNextLevel) / 100);
        
        
          // Incrementa el nivel y obtén el ID del siguiente nivel
          const nextLevelId = currentLevel + 1;

          if (nextLevelId >= levels.length) {
            const id = 1
            aumentarNivel(id);
            console.log('prueba');
            setCurrentLevel(nextLevelId);
          }
        
      }
    }
  }, [points, levels, currentLevel]);*/}

  const calculateNextLevelPoints = (currentLevel) => {
    // Supongamos que cada nivel requiere 100 puntos más que el nivel anterior
    return 100 * currentLevel;
  };



  return (
    <>
      <Sidebar />
      <div id='principal'>
        <div className='completadas'>
          {completedTasks.length === 0 ? (
            <p>No hay actividades completadas</p>
          ) : (
            completedTasks.map((task, index) => (
              <div key={index} className="task-card" id='task-points'>
                <div className="task-content">
                  <div className='completed-info'>
                    <h2>{task.nombre}</h2>
                    <h2 className='puntos'> </h2>
                  </div>
                  <div className="progress-bar-container">
                    <div className="progress-bar">
                      <div className="progress"></div>
                    </div>
                    <p>100%</p>
                  </div>
                </div>         
              </div>
            ))
          )}
        </div>


        <div class="card-level">
          <div class="img">
            <img src="./perfil.png" alt="" />
          </div>
          <div class="content-logro">
            <h2>{users.nombre_usuario}</h2>
            <p>Desarrollador Junior</p>
            <div class="center">
              <div class="box-logro">
                {levels.map((level, index) => (
                  <div key={index} className="">
                    <p > Nivel: {level.num_nivel}</p>
                 {/*<button onClick={() => aumentarNivel(level.id)}> subir</button>*/ } 
                  </div>
                ))}
              </div>
              <div class="box-logro">
                {points.map((point, index) => (
                  <div key={index} className="">

                    <p > Puntuación total: {point.cantidad_puntos}</p>



                  </div>

                ))}
              </div>
            </div>

          </div>
        </div>

                 
      </div>

    </>
  )
}

export default Logro