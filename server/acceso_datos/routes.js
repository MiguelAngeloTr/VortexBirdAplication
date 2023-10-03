import { Router } from "express";
import {getTask,
getTasks,
createTask,
updateTask,
deleteTask
} 
from '../acceso_datos/controller.js'

const router = Router()



//Solicitudes http para el manejo de las actividades
//peticion para obtener todas las actividades
router.get("/tasks", getTasks);

//peticion para obtener una actividad en especifico
router.get("/tasks/:id", getTask)
//query para crear una nueva actividad
router.post("/tasks", createTask);

//query para actulizar una actividad especifica
router.put("/tasks/:id", updateTask);

//query para eliminar una actividad especifica
router.delete("/tasks/:id", deleteTask);


export default router