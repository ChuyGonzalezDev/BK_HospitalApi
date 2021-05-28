import { response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

require('dotenv').config();

const validateJWT = async(req: any, res = response, next: () => void) => {
    type Decoded = {
        uid: string;
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
        req.uid = _decoded.uid;
        req.name = _decoded.name;

        /** Busca el usuario que correspopnda al UID */
        const user = await User.findById(req.uid);        
        
        if(!user){
            return res.status(401).json({
                message: `Token no es válido. - [${req.uid}].`
            });
        }

        /** Si está inactivo */
        if (!user.status) {
            return res.status(401).json({
                message: `Token no es válido - [${user.status}].`
            });
        }

        req.uid = user.id;
        req.name = user.name;
        req.user = user;

        /** OK Continua */
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido.'
        });
    }
};

export { validateJWT };