import { response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import { generateJWT } from '../helpers/JWT';

require('dotenv').config();

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
        const token = await generateJWT(user.id, name);

        /** Crear usuario en BD */
        await user.save();

        /** Respuesta exitosa */
        res.status(201).json({
            status: true,
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

export {
    createUser  
};