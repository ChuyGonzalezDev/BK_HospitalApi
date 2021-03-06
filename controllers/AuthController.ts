import { response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import { generateJWT } from '../helpers/JWT';

require('dotenv').config();

async function login(req: any, res = response) {
    const { email, password } = req.body;

    try {
        /** Verificar email único.  */
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: `Usuario o contraseña no son correctos - [${email}].`
            });
        }

        /** Si está inactivo */
        if (!user.status) {
            return res.status(400).json({
                message: `Usuario o contraseña no son correctos - [${user.status}].`
            });
        }

        /** Verificar password */
        const isValid = bcrypt.compareSync(password, user.password);
        if (!isValid) {
            return res.status(400).json({
                message: 'Usuario o contraseña no son correctos.'
            });
        }

        /** Generar el JWT */
        const token = await generateJWT(user.id, user.name);

        res.json({            
            id: user.id,
            name: user.name,
            email,
            status: user.status,
            token
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Por favor hable con el administrador.'
        });
    }
};

async function renewToken(req: any, res = response) {
    const { id, name } = req;
    const user = req.user;

    /** Generar el JWT */
    const token = await generateJWT(user.id, user.name);

    res.json({        
        id: user.id,
        name: user.name,
        email: user.email,
        status: true,
        token
    });
};

export {
    login,
    renewToken
};