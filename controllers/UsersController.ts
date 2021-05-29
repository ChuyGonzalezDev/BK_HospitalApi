import { response, request, query } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import { generateJWT } from '../helpers/JWT';

require('dotenv').config

/** Obtener Usuarios con paginación */
async function getUsers(req = request, res = response) {
    const { rows = 5, from = 0 } = req.query;
    /** Únicamente los activos. */
    const query = { status: true };

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query).skip(Number(from)).limit(Number(rows))
    ]);

    res.json({
        total,
        users
    });
};

/** Obtener Usuarios por Id */
async function getUsersById(req = request, res = response) {
    const { id } = req.params;
    
    /** No muestra el estatus. */    
    //const user = await User.findById(id, { status: false });
    const user = await User.findById(id);

    res.json({ user });
};


/** Crear Usuario */
async function createUser(req = request, res = response) {
    const { name, email, password } = req.body;
    const user = new User({name, email, password});

    try {        
        /** Se asignan valores de Usuario por Default */        
        user.status = true;

        /** HASH de password */
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(password, salt);

        // /** Generar el JWT */
        // const token = await generateJWT(user.id, name);

        /** Crear usuario en BD */
        await user.save();

        /** Respuesta exitosa */
        res.status(201).json({
            user
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Por favor hable con el administrador.'
        });
    }
};

export {
    getUsers,
    getUsersById,
    createUser
};