import { Router } from "express";
import { pool } from "../conexion/conexion.js"

const router = Router()

//verificar conexion a bd
router.get('/ping', async (req, res) => {
    const [rows] = await pool.query('SELECT 1 + 1 AS  result')
    console.log(rows);
    res.json(rows)
})

export default router
