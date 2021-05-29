import { response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

require('dotenv').config();

async function validateJWT(req: any, res = response, next: () => void) {
    type Decoded = {
        id: string;
        name: string;
    };

    /** Leer Token */
    const token = req.header('token');

    if (!token) {
        return res.status(401).json({
            message: 'No hay token en la petición.'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRETPRIVATEKEY || '');
        let _decoded = <Decoded>decoded;
        req.id = _decoded.id;
        req.name = _decoded.name;

        /** Busca el usuario que correspopnda al id */
        const user = await User.findById(req.id);

        if (!user) {
            return res.status(401).json({
                message: `Token no es válido. - [${req.id}].`
            });
        }

        /** Si está inactivo */
        if (!user.status) {
            return res.status(401).json({
                message: `Token no es válido - [${user.status}].`
            });
        }

        req.id = user.id;
        req.name = user.name;
        req.user = user;

        /** OK Continua */
        next();
    } catch (error) {
        return res.status(401).json({
            status: false,
            message: 'Token no válido.'
        });
    }
};

export { validateJWT };