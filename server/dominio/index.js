import express from 'express'
import dotenv from 'dotenv';
import routes from '../acceso_datos/routes.js'
import {createPool} from 'mysql2/promise'
import cors from 'cors';

// Para manejar las variables de entorno env
dotenv.config()


const app = express();

app.use(express.json())

app.use(cors());
app.use(routes)

export const pool = createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'vortex_bird'

})



//procesar datos provenientes del cliente


//puerto de escucha
app.listen(process.env.PORT)
console.log("servidor corriendo en puerto ", process.env.PORT);