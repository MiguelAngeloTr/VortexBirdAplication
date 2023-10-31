import React, { useEffect, useState } from 'react';
import { useTasks } from '../../context/Context';

const Evidencia = ({ activeEvidenciakId }) => {
  const { tasks, toggleTaskDone, evidencias, loadEvidencias } = useTasks();

  const evidencia = evidencias.find(e => e.id === activeEvidenciakId);

  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    loadEvidencias();
  }, []);

  return (
    <div className="container">
        {evidencias.map((image, index) => (
          <div key={index} className="image-item">
            <p>ID: {image.id}</p>
            <img
              src={'http://localhost:4000/' + image.src} alt="Certificado" className="card-img-top"
            />
          </div>
        ))}
      </div>
  );
};

export default Evidencia;
