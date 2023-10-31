import React, { useEffect, useState } from 'react';
import { useTasks } from '../../context/Context';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal.js';
import './UnitsTable.css'; // Importa tu archivo CSS
import UnitsForm from '../UnitsForm/UnitsForm';
import UnitsDetalle from './UnitsDetalle/UnitsDetalle';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';



const UnitsTable = () => {
    const { units, loadUnits, deleteUnit, toggleUnitDone } = useTasks();
    const navigate = useNavigate();
    const [activeForm, setActiveForm] = useState(false); // Estado para el modal de UnitsForm
    const [activeDetalle, setActiveDetalle] = useState(false); // Estado para el modal de UnitsDetalle
    const [activeUnitId, setActiveUnitId] = useState(null);

    useEffect(() => {
        loadUnits();
    }, []);

    // Manejar la ventana de UnitsForm
    const toggleForm = () => {
        setActiveForm(!activeForm);
    }

    // Manejar la ventana de UnitsDetalle
    const toggleDetalle = (unitId) => {
        setActiveDetalle(!activeDetalle);
        setActiveUnitId(unitId);
    }

    // Cambiar estado de la actividad
    const handleEstado = async (unitId) => {
        await toggleUnitDone(unitId);
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="card-body d-flex justify-content-between align-items-center">
                            <div className="row align-items-center">
                                <div className="col">
                                    <h1 className="card-title">Unidades de Retorno</h1>
                                    <p className="card-text">
                                        <FontAwesomeIcon icon={faQuestionCircle} title="Aquí podrás agregar las unidades de retorno" />
                                    </p>
                                </div>
                                <div className="col-auto">
                                    <button className="btn btn-primary nueva-unidad" onClick={toggleForm}>Agregar nueva unidad</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className="table-container">
                {/* Modal para UnitsForm */}
                <Modal active={activeForm} toggle={toggleForm}>
                    <UnitsForm />
                    <button className="btn btn-danger" onClick={toggleForm}>Cerrar</button>
                </Modal>

                {/* Modal para UnitsDetalle */}
                <Modal active={activeDetalle} toggle={toggleDetalle}>
                    <UnitsDetalle activeUnitId={activeUnitId} />
                    <button className="btn btn-danger" onClick={toggleDetalle}>Cerrar</button>
                </Modal>

                <table className="scrollable-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nombre unidad</th>
                            <th>Objetivo</th>
                            <th>Fecha</th>
                            <th>Estado</th>
                            <th>Detalle</th>
                            <th>Edición</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {units.map((unit, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        type='checkbox'
                                        checked={unit.estado === 1}
                                        onClick={() => handleEstado(unit.id)}
                                    />
                                </td>
                                <td>{unit.nombre}</td>
                                <td>{unit.objetivo}</td>
                                <td>{new Date(unit.fecha).toLocaleDateString()}</td> {/* Mostrar fecha sola */}
                                <td>{unit.estado === 1 ? "Completado" : "Pendiente"}</td>
                                <td>
                                    <FontAwesomeIcon icon={faEye} size="2x" className="view-button" onClick={() => toggleDetalle(unit.id)} />
                                </td>
                                <td>
                                    <FontAwesomeIcon icon={faEdit} size="2x" className="edit-button" onClick={() => navigate(`/edit/unit/${unit.id}`)} />
                                </td>
                                <td>
                                    <FontAwesomeIcon icon={faTrash} size="2x" className="edit-button" onClick={() => deleteUnit(unit.id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>

    );
};

export default UnitsTable;
