import { response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';


const createUser = async (req: any, res = response) => {
    const { name, email, password } = req.body;

    try {
        //TODO: Verificar email único.        
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).jsonp({
                ok: false,
                msg: `El usuario ya se encuentra registrado: ${email}`
            });
        }

        //TODO: Crear usuario en BD.
        user = new User(req.body);        
        user.status = true; //Status default
        
        //TODO: Hashear la contraseña.
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(password, salt);
        console.log(user.password);
        
        await user.save();

        //TODO: Generar el JWT.
        

        return res.status(201).jsonp({
            ok: true,
            uid: user.id,
            name,
            email
        });
        
        //TODO: Generar response OK.

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador.'
        });
    }

    return res.json({
        ok: true,
        msg: 'Crear usuario /create'
    });
}

const login = (req: any, res = response) => {
    const { email, password } = req.body;

    return res.json({
        ok: true,
        msg: 'Login usuario /'
    });
}

const tokenRenew = (req: any, res = response) => {
    return res.json({
        ok: true,
        msg: 'Renew'
    });
}

export {
    createUser,
    login,
    tokenRenew
};