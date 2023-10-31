import { query } from 'express'
import { pool } from '../dominio/index.js'
import mysql from 'mysql'
import fs from 'fs';
import path from 'path';

//manejo de archivos

//peticion para obtener todas las actividades
export const getTasks = async (req, res) => {
    try {

        const [result] = await pool.query("SELECT * from actividades ORDER BY fecha_inicio ASC")
        res.json(result)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

//peticion para obtener una actividad en especifico
export const getTask = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * from actividades WHERE id = ?", [
            req.params.id,
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "Actividad no encontrada" });

        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

//query para crear una nueva actividad
export const createTask = async (req, res) => {
    try {
        const {
            nombre,
            descripcion,
            fecha_inicio,
            fecha_final,
            tipo,
            archivo } = req.body

        const [result] = await pool.query(
            "INSERT INTO actividades(nombre, descripcion, fecha_inicio, fecha_final, tipo, archivo) VALUES (?,?,?,?,?,?)",
            [nombre, descripcion, fecha_inicio, fecha_final, tipo, archivo]
        )
        

        res.json({
            id: result.insertId,
            nombre,
            descripcion,
            fecha_inicio,
            fecha_final,
            tipo,
            archivo
        })
    } catch (error) {
        console.error("Error al crear la tarea:", error);
        return res.status(500).json({ message: error.message });
    }
}

//query para actulizar una actividad especifica
export const updateTask = async (req, res) => {
    try {
        const [result] = await pool.query("UPDATE actividades SET ? WHERE id = ?", [req.body, req.params.id])

        res.json(result)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}


//query para eliminar una actividad especifica
export const deleteTask = async (req, res) => {
    try {
        const [result] = await pool.query("DELETE from actividades WHERE id =?", [req.params.id])

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "No se encontro la actividad" });

        return res.sendStatus(204)

    } catch (error) {
        return res.status(500).json({ message: error.message });

    }

}


//Solicitudes http para el manejo de las unidades retorno


//peticion para obtener todas las unidades
export const getUnits = async (req, res) =>{
    try {
        const [result] = await pool.query("SELECT * from unidades_retorno")
        res.json(result)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

//peticion para obtener una unidad en especifico
export const getUnit = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * from unidades_retorno WHERE id = ?", [
            req.params.id,
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "unidad no encontrada" });

        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}


//query para crear una nueva unidad
export const createUnit = async (req, res) => {
    try {
        const {
            nombre,
            objetivo,
            archivo,
            descripcion,
            nota,
            fecha
            } = req.body

        const [result] = await pool.query(
            "INSERT INTO unidades_retorno(nombre, objetivo, archivo, descripcion, nota, fecha) VALUES (?,?,?,?,?,?)",
            [nombre, objetivo, archivo, descripcion, nota, fecha]
        )
       

        res.json({
            id: result.insertId,
            nombre,
            objetivo,
            archivo,
            descripcion,
            nota,
            fecha
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


//query para actulizar una unidad especifica
export const updateUnit = async (req, res) => {
    try {
        const [result] = await pool.query("UPDATE unidades_retorno SET ? WHERE id = ?", [req.body, req.params.id])

        res.json(result)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}


//query para eliminar una unidad especifica
export const deleteUnit = async (req, res) => {
    try {
        const [result] = await pool.query("DELETE from unidades_retorno WHERE id =?", [req.params.id])

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "No se encontro la unidad" });

        return res.sendStatus(204)

    } catch (error) {
        return res.status(500).json({ message: error.message });

    }

}


///

//peticion para obtener todas las recompensas personalizables
export const getRewards = async (req, res) => {
    try {

        const [result] = await pool.query("SELECT * from recompensas")
        res.json(result)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

//query para actulizar el estado/preferencia de las recompensas
export const updateRewards = async (req, res) => {
    try {
        const [result] = await pool.query("UPDATE recompensas SET ? WHERE id = ?", [req.body, req.params.id])

        res.json(result)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}


///


//peticion para obtener todas las puntuaciones
export const getPoints = async (req, res) => {
    try {

        const [result] = await pool.query("SELECT * from puntuaciones ")
        res.json(result)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

//peticion para obtener una actividad en especifico
export const getPoint= async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * from puntuaciones WHERE id = ?", [
            req.params.id,
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "puntuacion no encontrada" });

        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

//query para eliminar una unidad especifica
export const deletePoint = async (req, res) => {
    try {
        const [result] = await pool.query("DELETE from puntuaciones WHERE id =?", [req.params.id])

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "No se encontro la puntuacion" });

        return res.sendStatus(204)

    } catch (error) {
        return res.status(500).json({ message: error.message });

    }

}

//query para actulizar la cantidad de puntos 
export const updatePoints = async (req, res) => {
    try {
        const [result] = await pool.query("UPDATE puntuaciones SET cantidad_puntos = cantidad_puntos + 50 WHERE id = ?", [ req.params.id])

        res.json(result)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}


///


//peticion para obtener todos los niveles
export const getLevels = async (req, res) => {
    try {

        const [result] = await pool.query("SELECT * from niveles ")
        res.json(result)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

//peticion para obtener una nivel en especifico
export const getLevel = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * from niveles WHERE id = ?", [
            req.params.id,
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "Nivel no encontrado" });

        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

//query para eliminar una unidad especifica
export const deleteLevel = async (req, res) => {
    try {
        const [result] = await pool.query("DELETE from niveles WHERE id =?", [req.params.id])

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "No se encontro el nivel" });

        return res.sendStatus(204)

    } catch (error) {
        return res.status(500).json({ message: error.message });

    }

}

//query para actulizar la cantidad de puntos 
export const updateLevels = async (req, res) => {
    try {
        const [result] = await pool.query("UPDATE niveles SET num_nivel = num_nivel +  1 WHERE id = ?", [ req.params.id])

        res.json(result)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

///

//peticion para obtener todas las evidencias
export const getEvidencias = async (req, res) => {
    try {

        const [result] = await pool.query("SELECT * from evidencias")

        res.json(result)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

//peticion para obtener una evidencia en especifico
export const getEvidencia= async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * from evidencias WHERE id = ?", [
            req.params.id,
        ]);

        if (result.length === 0)
            return res.status(404).json({ message: "Evidencia no encontrada" });

        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

//query para eliminar una evidencia en especifico
export const deleteEvidencia = async (req, res) => {
    try {
        const [result] = await pool.query("DELETE from evidencias WHERE id =?", [req.params.id])

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "No se encontro la evidencia" });

        return res.sendStatus(204)

    } catch (error) {
        return res.status(500).json({ message: error.message });

    }

}

//query para actulizar una evidencia
export const updateEvidencia = async (req, res) => {
    try {
        const [result] = await pool.query("UPDATE evidencias SET ? WHERE id = ?", [ req.params.id])

        res.json(result)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}
