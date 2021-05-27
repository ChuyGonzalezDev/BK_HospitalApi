/** Importaciones */
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import path from 'path';
import { dbConnection } from './db/MongoConnection';
import { authRouter } from './routes/auth';

require('dotenv').config();

async function main() {
    /** Crear servidor/app de Express */
    const app = express();

    /** Configuración de Puerto */
    const port = process.env.PORT;

    /** Configuración CORS */
    app.use(cors());

    /** PATH Público */
    app.use(express.static('public'));

    /** Lectura y parseo del body */
    app.use(express.json());

    /** Rutas de API */    
    app.use('/api/login', authRouter);

    /** Escucha el puerto en el que se ejecuta la API */
    app.listen(port, () => console.log(`Server running on port ${port} 🔥`));

    /** Conexión a BD */
    //dbConnection();    
}

main();
