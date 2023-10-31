import React, { useEffect } from 'react'
import { useTasks } from '../../context/Context'

const DetalleTask = ({ detalleTaskId }) => {

    const { tasks, loadTasks } = useTasks()

    const task = tasks.find(task => task.id === detalleTaskId)

    useEffect(() => {
        loadTasks()
    }, [])

    return (

        <>


            <p>Nombre de la Actividad: {task.nombre}</p>
            <p>Descripción: {task.descripcion}</p>
            <p>Fecha Inicio: {new Date(task.fecha_inicio).toLocaleDateString()}</p>
            <p>Fecha Finalización: {new Date(task.fecha_final).toLocaleDateString()}</p>
            <p>Tipo de Actividad: {task.tipo}</p>



        </>
    )
}

export default DetalleTask