import { Router } from "express";
import {authRequired} from './middlewares/validateToken.js'
import { register,login,logout,perfil, verifyToken,
    getTasksById, getTasksAll,
    getTask,
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    updateTaskPoints,
    getUnits,
    getUnit,
    createUnit,
    updateUnit,
    deleteUnit,
    getRewards,
    updateRewards,
    getPoints,
    getPoint,
    deletePoint,
    updatePoints,
    getLevels,
    getLevel,
    deleteLevel,
    updateLevels,
    getEvidencias,
    getEvidencia,
    deleteEvidencia,
    updateEvidencia,
}
    from '../acceso_datos/controller.js'

import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path'
import { pool } from '../dominio/index.js'
import fs from 'fs';
import { profile } from "console";




const router = Router()


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const diskstorage = multer.diskStorage({
    destination: path.join(__dirname, '../images'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname)
    }
})

const fileUpload = multer({
    storage: diskstorage
}).single('image')


//solictud para manejo de archivos
router.post("/images/post", fileUpload, async (req, res) => {



    try {
        const type = req.file.mimetype
        const name = req.file.originalname
        const data = fs.readFileSync(path.join(__dirname, '../images/' + req.file.filename))
        const [result] = await pool.query('INSERT INTO evidencias set ?', [{ type, name, data }], (err, rows) => {
            res.send('Imagen guardada')
        })
        res.json(result)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    console.log(req.file);

});



router.get("/images/get/:id", async (req, res) => {
    const evidenciaId = req.params.id; // Obtén el ID de los parámetros de la URL.

    try {
        const connection = await pool.getConnection();
        const [rows] = await pool.query("SELECT * FROM evidencias WHERE id = ?", [evidenciaId]);
        connection.release();

        if (rows.length === 0) {
            return res.status(404).json({ message: "Evidencia no encontrada" });
        }

        const img = rows[0];
        fs.writeFileSync(
            path.join(__dirname, `../dbimages/${img.id}-vortex.png`),
            img.data
        );

        // Solo envía el archivo correspondiente al ID especificado en la respuesta.
        res.sendFile(path.join(__dirname, `../dbimages/${img.id}-vortex.png`));

    } catch (error) {
        console.error('Error al obtener la imagen:', error);
        res.status(500).send('Error interno del servidor');
    }
});


router.get("/images/get", async (req, res) => {
    try {
      const connection = await pool.getConnection();
      const [rows] = await pool.query("SELECT id, data FROM evidencias");
      connection.release();
  
      rows.map((img) => {
        fs.writeFileSync(
          path.join(__dirname, '../dbimages/' + img.id + '-vortex.png'),
          img.data
        );
      });
  
      const imageList = rows.map((img) => ({
        id: img.id,
        src: img.id + '-vortex.png',
      }));
  
      res.json(imageList);
    } catch (error) {
      console.error('Error al obtener imágenes:', error);
      res.status(500).send('Error interno del servidor');
    }
  });
  



//Solicitudes http para el manejo de las actividades//

//ruta para logear usuario

router.post('/login' , login)

//ruta para un nuevo usuario
router.post('/register' , register)

//ruta para cerrar sesion
router.post('/logout', logout)

//verificar Token
router.get("/verify", verifyToken);

//ruta 
router.get('/perfil', authRequired , perfil)
///


//peticion para buscar las actividades de un usuario
router.post("/tasksById", getTasksById)

//peticion para obtener todas las actividades
router.get("/tasksAll", getTasksAll );

//peticion para obtener todas las actividades de un usuario activo
router.get("/tasks", authRequired, getTasks);

//peticion para obtener una actividad en especifico
router.get("/tasks/:id", getTask)

//query para crear una nueva actividad
router.post("/tasks", authRequired, createTask);

//query para actulizar una actividad especifica
router.put("/tasks/:id", updateTask);

//query para eliminar una actividad especifica
router.delete("/tasks/:id", deleteTask);

//query para actulizar una actividad especifica con puntos
router.put("/tasksPoints/:id", updateTaskPoints);


//Solicitudes http para el manejo de las unidades retorno//

//peticion para obtener todas las unidades
router.get("/units", getUnits);

//peticion para obtener una unidad en especifico
router.get("/units/:id", getUnit)

//query para crear una nueva unidad
router.post("/units", createUnit);

//query para actulizar una unidad especifica
router.put("/units/:id", updateUnit);

//query para eliminar una unidad especifica
router.delete("/units/:id", deleteUnit);

//Solicitudes http para el manejo de las recompensas personalizables//


//peticion para obtener todas las opciones de recompenas personalizables
router.get("/rewards", getRewards);

//query para actulizar el estado/preferencia de las recompensas
router.put("/rewards/:id", updateRewards);
///

//peticion para obtener todas las puntuaciones
router.get("/points", getPoints);

//peticion para obtener una puntuacion en especifico
router.get("/points/:id", getPoint)

//query para eliminar una puntuacion especifica
router.delete("/points/:id", deletePoint);

//query para actulizar la cantidad de puntos
router.put("/points/:id", updatePoints);


///


//peticion para obtener todos los niveles
router.get("/levels", getLevels);

//peticion para obtener un nivel en especifico
router.get("/levels/:id", getLevel)

//query para eliminar un nivel en especifico
router.delete("/levels/:id", deleteLevel);

//query para actulizar la cantidad de puntos
router.put("/levels/:id", updateLevels);

///

//peticion para obtener todas las evidencias
router.get("/evidencias", getEvidencias);

//peticion para obtener una evidencia
router.get("/evidencias/:id", getEvidencia)

//query para eliminar una evidencia en especifico
router.delete("/evidencias/:id", deleteEvidencia);

//query para actulizar las evidencias
router.put("/evidencias/:id", updateEvidencia);

export default router