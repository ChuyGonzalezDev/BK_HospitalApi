/** Importaciones */
import express from 'express';
import cors from 'cors';

import { authRouter } from './routes/auth';
import { userRouter } from './routes/Users';
import { MongoConnection } from './db/Connection';
import { hospitalRouter } from './routes/Hospital';
import { doctorRouter } from './routes/Doctor';

require('dotenv').config();

async function main() {
    //validateJWT;    
    /** Puerto */
    const port = process.env.PORT;
            
    /** Crear servidor/app de Express */
    const app = express();

    /** Conexión a BD */
    await MongoConnection.connect();
    //dbConnection();

    /** Configuración CORS */
    app.use(cors());

    /** PATH Público */
    app.use(express.static('public'));

    /** Lectura y parseo del body */
    app.use(express.json());

    /** Rutas API */
    app.use('/login', authRouter);
    app.use('/users', userRouter);
    app.use('/hospitals', hospitalRouter);
    app.use('/doctors', doctorRouter);

    /** Escucha el puerto en el que se ejecuta la API */
    app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
}

main();
