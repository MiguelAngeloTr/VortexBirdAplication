import express from 'express'
import dotenv from 'dotenv';
import indexRoutes from '../acceso_datos/index.routes.js'

// Para manejar las variables de entorno env
dotenv.config()


const app = express();

app.use(indexRoutes)
//puerto de escucha
app.listen(process.env.PORT)
console.log("servidor corriendo en puerto ", process.env.PORT);