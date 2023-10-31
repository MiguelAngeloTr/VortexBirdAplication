import React, { useEffect } from 'react'
import { useTasks } from '../../context/Context';


const Prueba = () => {

  useEffect(() => {
    loadPoints();
    
  }, []);

  const { points, updatePoint, loadPoints } = useTasks();

  const handlePoints = async (pointId) => {
    await updatePoint(pointId);
  }

  return (
    <>

      {points.map((point, index) => (
        <div key={index} className="unit-card">

          <p > Puntuación total: {point.cantidad_puntos}</p>


          <button onClick={() => handlePoints(point.id)}>Aumentar</button>
        </div>

      ))}
    </>
  )
}

export default Prueba