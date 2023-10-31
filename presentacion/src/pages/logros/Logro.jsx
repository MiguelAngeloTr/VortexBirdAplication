
import Sidebar from '../../components/sidebar/Sidedar'
import { useTasks } from '../../context/Context'
import { useEffect } from 'react'
import './Logro.css'


const Logro = () => {


  const { points, loadPoints, updatePoint, levels, loadLevels } = useTasks()


  useEffect(() => {
    loadPoints();
    loadLevels();
  }, []);

  


  return (
    <>
      <Sidebar />


      <div class="card-level">
        <div class="img">
          <img src="./perfil.png" alt="" />
        </div>
        <div class="content-logro">
          <h2>Alvaro</h2>
          <p>Desarrollador Junior</p>
          <div class="center">
            <div class="box-logro">
              {levels.map((level, index) => (
                <div key={index} className="">
                  <p > Nivel: {level.num_nivel}</p>
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




    </>
  )
}

export default Logro