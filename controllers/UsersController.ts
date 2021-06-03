import { response, request } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';

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

    /** En caso de no querer monstrar el estatus. */
    //const user = await User.findById(id, { status: false });

    const user = await User.findById(id);

    res.json({ user });
};

/** Crear Usuario */
async function createUser(req = request, res = response) {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });

    try {
        /** Se asignan valores de Usuario por Default */
        user.status = true;

        /** HASH de password */
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(password, salt);

        /** Crear usuario en BD */
        await user.save();

        /** Respuesta exitosa */
        res.status(201).json({
            user,
            message: 'Creación de Usuario correctamente.'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Por favor hable con el administrador.'
        });
    }
};

/** Actualizar Usuario */
async function updateUser(req = request, res = response) {
    const { id } = req.params;
    const { _id, email, password, ...user } = req.body;

    if (password) {
        /** HASH de password */
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(password, salt);
    }
    if (email) {
        user.email = email;
    }

    const userResponse = await User.findByIdAndUpdate(id, user);    

    if (userResponse) {
        res.status(200).json({
            user: {
                id: id,
                name: user.name,
                email: user.email
            },
            message: 'Se realizó la actualización correctamente.'
        });
    } else {
        res.status(400).json({
            message: 'Error en la actualización.'
        });
    }

}

/** Deshabilitar Usuario */
async function deleteUser(req = request, res = response) {
    const { id } = req.params;

    const userResponse = await User.findByIdAndUpdate(id, { status: false });

    if (userResponse) {
        res.status(200).json({
            user: {
                id: id,
                name: userResponse.name,
                email: userResponse.email,
                status: false
            },
            message: 'Se deshabilito el Usuario correctamente.'
        });
    } else {
        res.status(400).json({
            message: 'Error al deshabilitar el Usuario.'
        });
    }
}

export {
    getUsers,
    getUsersById,
    createUser,
    updateUser,
    deleteUser
};