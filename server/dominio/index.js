import express from 'express'
import dotenv from 'dotenv';
import routes from '../acceso_datos/routes.js'
import {createPool} from 'mysql2/promise'
import cors from 'cors';

import path from 'path';
import { dirname } from 'path'
import { fileURLToPath } from 'url';

// Para manejar las variables de entorno env
dotenv.config()

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(express.json())
app.use(express.static(path.join(__dirname, '../dbimages')))

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