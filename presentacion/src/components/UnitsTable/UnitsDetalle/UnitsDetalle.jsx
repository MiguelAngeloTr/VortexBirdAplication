import React from 'react';
import { useTasks } from '../../../context/Context';
import './UnitsDetalle.css'

const UnitsDetalle = ({ activeUnitId }) => {
  const { units } = useTasks();
  
  const unit = units.find(u => u.id === activeUnitId);

  return (
    <div className="units-detalle">
      <div className="unit-card">
        <h2 className="unit-title">Nombre de la unidad de retorno</h2>
        <p className="unit-info">{unit.nombre}</p>

        <h3 className="unit-title">Objetivo</h3>
        <p className="unit-info">{unit.objetivo}</p>

        <h3 className="unit-title">Descripción</h3>
        <textarea className="unit-textarea" value={unit.descripcion} readOnly />

        <h3 className="unit-title">Nota Coach</h3>
        <textarea className="unit-textarea" value={unit.nota} readOnly />
      </div>
    </div>
  );
};

export default UnitsDetalle;
