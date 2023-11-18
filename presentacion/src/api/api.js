import axios from "./axios";

//login

//llamado a la api para crear un usuario
export const createUserRequest = async (user) =>
  await axios.post('http://localhost:4000/register', user)

 //llamado a la api para loguear un usuario
export const loginUserRequest = async (user) =>
await axios.post('http://localhost:4000/login', user)

//verificar Token
export const verifyTokenRequest = async () => axios.get('http://localhost:4000/verify');

///

//peticion para obtener una actividad de un usuario especifico
export const getTasksByIdRequest = async (id) =>
  await axios.post('http://localhost:4000/tasksById', id);

 //peticion para obtener todas las actividades d
export const getTasksAllRequest = async () =>
await axios.get('http://localhost:4000/tasksAll');

//peticion para obtener todas las actividades de un usuario activo
export const getTasksRequest = async () =>
  await axios.get("http://localhost:4000/tasks");

//llamado a la api para crear una nueva actividad
export const createTaskRequest = async (task) =>
  await axios.post('http://localhost:4000/tasks', task)

//llamado a la api para eliminar una actividad especifica
export const deleteTaskRequest = async (id) =>
  await axios.delete(`http://localhost:4000/tasks/${id}`)

//llamado a la api para obtener una actividad en especifico
export const getTaskRequest = async (id) =>
  await axios.get(`http://localhost:4000/tasks/${id}`);

//llamado a la api para actulizar una actividad especifica
export const updateTaskRequest = async (id, newFields) =>
  await axios.put(`http://localhost:4000/tasks/${id}`, newFields);

//cambiar el estado de la actividad
export const toggleTaskDoneRequest = async (id, estado) =>
  await axios.put(`http://localhost:4000/tasks/${id}`, {
    estado,
});

//
export const updateTaskRequestPoints = async (id, newFields) =>
  await axios.put(`http://localhost:4000/tasks/${id}`, newFields);


///

//peticion para obtener todas las actividades
export const getUnitsRequest = async () =>
  await axios.get("http://localhost:4000/units");

//llamado a la api para crear una nueva unidad
export const createUnitRequest = async (unit) =>
  await axios.post('http://localhost:4000/units', unit)

//llamado a la api para eliminar una unidad especifica
export const deleteUnitRequest = async (id) =>
  await axios.delete(`http://localhost:4000/units/${id}`)

//llamado a la api para obtener una unidad en especifico
export const getUnitRequest = async (id) =>
  await axios.get(`http://localhost:4000/units/${id}`);

//llamado a la api para actulizar una unidad especifica
export const updateUnitRequest = async (id, newFields) =>
  await axios.put(`http://localhost:4000/units/${id}`, newFields);

//cambiar el estado de la unidad de retorno
export const toggleUnitDoneRequest = async (id, estado) =>
  await axios.put(`http://localhost:4000/units/${id}`, {
    estado,
  });

///

//peticion para obtener todas las personalizaciones de recompensa
export const getRewardRequest = async () =>
  await axios.get("http://localhost:4000/rewards");

//cambiar el estado/preferencia de tecnologia
export const toggleRewardDoneRequest = async (id, flagTecnologia) =>
  await axios.put(`http://localhost:4000/rewards/${id}`, {
    flagTecnologia,
  });

//cambiar el estado/preferencia de videojuegos
export const toggleRewardDoneRequestVideo = async (id, flagVideojuegos) =>
await axios.put(`http://localhost:4000/rewards/${id}`, {
  flagVideojuegos,
});

//cambiar el estado/preferencia de Libros
export const toggleRewardDoneRequestLibros = async (id, flagLibros) =>
await axios.put(`http://localhost:4000/rewards/${id}`, {
  flagLibros,
});

//cambiar el estado/preferencia de Salud
export const toggleRewardDoneRequestSalud = async (id, flagGimnasio) =>
await axios.put(`http://localhost:4000/rewards/${id}`, {
  flagGimnasio,
});

//cambiar el estado/preferencia de Arte
export const toggleRewardDoneRequestArte = async (id, flagArte) =>
await axios.put(`http://localhost:4000/rewards/${id}`, {
  flagArte,
});

//cambiar el estado/preferencia de Alimentacion
export const toggleRewardDoneRequestAlimentacion = async (id, flagAlimentacion) =>
await axios.put(`http://localhost:4000/rewards/${id}`, {
  flagAlimentacion,
});


///


//peticion para obtener todas las puntuaciones
export const getPointsRequest = async () =>
  await axios.get("http://localhost:4000/points");

//llamado a la api para eliminar una puntuacion especifica
export const deletePointRequest = async (id) =>
  await axios.delete(`http://localhost:4000/points/${id}`)

//llamado a la api para obtener una puntuacion en especifico
export const getPointRequest = async (id) =>
  await axios.get(`http://localhost:4000/points/${id}`);

//llamado a la api para actulizar una puntuacion en especifico
export const updatePointRequest = async (id) =>
  await axios.put(`http://localhost:4000/points/${id}`);


///

//peticion para obtener todos los niveles
export const getLevelsRequest = async () =>
  await axios.get("http://localhost:4000/levels");

//llamado a la api para eliminar un nivel en especifico
export const deleteLevelRequest = async (id) =>
  await axios.delete(`http://localhost:4000/levels/${id}`)

//llamado a la api para obtener una puntuacion en especifico
export const getLevelRequest = async (id) =>
  await axios.get(`http://localhost:4000/levels/${id}`);

//llamado a la api para actulizar el nivel
export const updateLevelRequest = async (id) =>
await axios.put(`http://localhost:4000/levels/${id}`);



///



//llamado a la api para eliminar una evidencia
export const deleteEvidenciaRequest = async (id) =>
await axios.delete(`http://localhost:4000/evidencias/${id}`)

//llamado a la api para obtener una puntuacion en especifico
export const getEvidenciaRequest = async (id) =>
  await axios.get(`http://localhost:4000/evidencias/${id}`);


////

//

//peticion para obtener todas las evidencias
export const getEvidenciasRequest = async () =>
  await axios.get("http://localhost:4000/images/get");

//
export const mostrarEvidenciaRequest = async (id) =>
  await axios.get(`http://localhost:4000/images/get/${id}`);
