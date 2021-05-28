import { response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import { generateJWT } from '../helpers/JWT';

require('dotenv').config();

/** Secret Key */
const seed = process.env.SECRETPRIVATEKEY;

const createUser = async (req: any, res = response) => {
    const { name, email, password } = req.body;

    try {
        /** Verificar email único.  */
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                message: `El usuario ya se encuentra registrado: ${email}.`
            });
        }

        /** Se asignan valores de Usuario */
        user = new User(req.body);
        user.status = true; //Status default

        /** HASH de password */
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(password, salt);

        /** Generar el JWT */
        const token = await generateJWT(user.id, name, seed);

        /** Crear usuario en BD */
        await user.save();

        /** Respuesta exitosa */
        res.status(201).json({
            ok: true,
            uid: user.id,
            name,
            email,
            token
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Por favor hable con el administrador.'
        });
    }
};

const login = async (req: any, res = response) => {
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
        const token = await generateJWT(user.id, user.name, seed);

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            email,
            token
        });

    } catch (error) {
        return res.status(500).json({            
            message: 'Por favor hable con el administrador.'
        });
    }
};

const renewToken = async (req: any, res = response) => {
    const { uid, name } = req;    
    const user = req.user;    

    /** Generar el JWT */
    const token = await generateJWT(user.id, user.name, seed);

    res.json({
        ok: true,
        uid: user.id,
        name: user.name,
        email: user.email,
        token
    });
};

export {
    createUser,
    login,
    renewToken
};