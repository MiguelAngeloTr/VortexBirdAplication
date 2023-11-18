import React, { useEffect, useState } from 'react';
import { useTasks } from '../../context/Context';
import { toast, ToastContainer } from 'react-toastify';

const Files = ({ activeTaskId }) => {
    const [file, setFile] = useState(null);

    // deshabilitar el boton de subir hasta que se haya seleccionado un archivo
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    //estado para mostrar el boton de obtener puntos
    const [showGetPointsButton, setShowGetPointsButton] = useState(false);

    //controlar si los puntos se han obtenido y esconde le boton de obtener
    const [pointsObtained, setPointsObtained] = useState(false);


    const [evidenceUploaded, setEvidenceUploaded] = useState(false);

    const { tasks, loadTasks,  toggleTaskDone, points, updatePoint, loadPoints, updateTaskPoints, updateTask} = useTasks();

    const task = tasks.find(t => t.id === activeTaskId);

    const [totalPuntos ,setTotalPuntos] = useState(1)


    useEffect(() => {
        loadPoints();
        loadTasks();
    }, [])


    const selectedHandler = e => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        // Habilitar o deshabilitar el botón en función de si se ha seleccionado un archivo
        setIsButtonDisabled(!selectedFile);
    };

    const handleEstado = async taskId => {
        await toggleTaskDone(taskId);
        toast.success("Actividad Completada");
    };

    const sendHandler = () => {
        if (!file) {
            alert('Debes seleccionar un archivo');
            return;
        }

        const formdata = new FormData();
        formdata.append('image', file);

        fetch('http://localhost:4000/images/post', {
            method: 'POST',
            body: formdata,
        })
            .then(res => res.text())
            .then(res => console.log(res))
            .catch(err => {
                console.error(err);
            });

        document.getElementById('fileinput').value = null;
        setFile(null);

        // Deshabilitar el botón nuevamente después de cargar el archivo
        setIsButtonDisabled(true);


    };

    const enviarYMarcar = () => {
        sendHandler();
        handleEstado(task.id);
        setShowGetPointsButton(true);
        setEvidenceUploaded(true); // Indica que se ha subido la evidencia
    };

    const handlePoints = async (pointId) => {
        const differenceInDays = calculateDateDifference(task.fecha_inicio, task.fecha_final);
      
        for (let i = 0; i < differenceInDays; i++) {
          await updatePoint(pointId);
          
        }
        setTotalPuntos(differenceInDays * 10)
        await updateTask(task.id, totalPuntos.toString());
        toast.success('+' + differenceInDays * 10 + "puntos");
        setPointsObtained(true); // Actualiza el estado para indicar que se obtuvieron los puntos

        
      };

    const calculateDateDifference = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const differenceInMilliseconds = end - start;
        const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
        return differenceInDays;
      };

    return (
        <>

            <ToastContainer position="bottom-center" />
            <h5>Para finalizar tu actividad debes adjuntar evidencia</h5><br />
            <h6>Solo se permite formato imagen</h6>
            <p className="unit-info"> Actividad: {task.nombre}</p>
            <p>{totalPuntos}</p>
            <input id="fileinput" type="file" onChange={selectedHandler} />
            <button
                type="button"
                onClick={() => enviarYMarcar()}
                disabled={isButtonDisabled} // Habilitar o deshabilitar el botón según el estado
            >
                Subir evidencia
            </button>


            {points.map((point, index) => (
                <div key={index}>

                    {evidenceUploaded && !pointsObtained ? (
                        <button onClick={() => handlePoints(point.id)}>Obtener puntos</button>
                    ) : pointsObtained ? (
                        <p></p>
                    ) : null}

                </div>
            ))}


        </>
    );
};

export default Files;
