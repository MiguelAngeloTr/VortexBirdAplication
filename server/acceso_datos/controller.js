import { query } from 'express'
import { pool } from '../dominio/index.js'
import mysql from 'mysql'


//peticion para obtener todas las actividades
export const getTasks = async (req, res) => {
    const [result] = await pool.query("SELECT * from actividades")

    res.json(result)
}

export const getTask = async (req, res) => {

}

export const createTask = async (req, res) => {
    const {
        nombre,
        descripcion,
        fecha_inicio,
        fecha_final,
        tipo,
        fk_cedula_colaborador,
        fk_id_plan
    } = req.body

    const [result] = await pool.query(
        "INSERT INTO actividades(nombre, descripcion, fecha_inicio, fecha_final, tipo, fk_cedula_colaborador, fk_id_plan) VALUES (?,?,?,?,?,?,?)",
        [nombre, descripcion, fecha_inicio, fecha_final, tipo, fk_cedula_colaborador, fk_id_plan]
    )
    console.log(result);

    res.json({
        id: result.insertId,
        nombre,
        descripcion,
        fecha_inicio,
        fecha_final,
    })
}

export const updateTask = async (req, res) => {
    const {
        nombre,
        descripcion,
        fecha_inicio,
        fecha_final,
        tipo,} = req.body

       const [result] = await pool.query("UPDATE actividades SET ? WHERE id = ?", [req.body, req.params.id])

       res.json(result)
}

export const deleteTask = async (req, res) => {

    const [result] = await pool.query("DELETE from actividades WHERE id =?", [req.params.id])

    if(result.affectedRows === 0)
    return res.status(404).json({ message: "No se encontro la actividad" });
    
    return res.sendStatus(204)
    


}