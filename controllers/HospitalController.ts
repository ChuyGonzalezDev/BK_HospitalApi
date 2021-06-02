import { response, request } from 'express';
import Hospital from '../models/Hospital';

require('dotenv').config

/** Obtener Hospitales con paginación */
async function get(req = request, res = response) {
    const { rows = 5, from = 0 } = req.query;
    /** Únicamente los activos. */
    const query = { status: true };

    const [total, hospitals] = await Promise.all([
        Hospital.countDocuments(query),
        Hospital.find(query).skip(Number(from)).limit(Number(rows))
    ]);

    res.json({
        total,
        hospitals
    });
};

/** Obtener Hospital por Id */
async function getById(req = request, res = response) {
    const { id } = req.params;    

    const hospital = await Hospital.findById(id);

    res.json({ hospital });
};

/** Crear Hospital */
async function create(req: any, res = response) {
    const { name, address, cp, city, country, user } = req.body;
    const hospital = new Hospital({ name, address, cp, city, country, user });

    try {
        /** Se asignan valores por Default */
        hospital.status = true;

        /** Crear usuario en BD */
        const response = await hospital.save();        

        /** Respuesta exitosa */
        res.status(201).json({
            hospital: response,
            message: 'Creación de Hospital correctamente.'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Por favor hable con el administrador.'
        });
    }
};

/** Actualizar Hospital */
async function update(req = request, res = response) {
    const { id } = req.params;
    const { _id, ...hospital } = req.body;    

    const response = await Hospital.findByIdAndUpdate(id, hospital);

    if (response) {
        res.status(200).json({
            hospital: {
                id: id,
                name: hospital.name,
                address: hospital.address,
                cp: hospital.cp,
                city: hospital.city,
                country: hospital.country,
                user: hospital.user                
            },
            message: 'Se realizó la actualización correctamente.'
        });
    } else {
        res.status(400).json({
            message: 'Error en la actualización.'
        });
    }
}

/** Deshabilitar Hospital */
async function deleteHospital(req = request, res = response) {
    const { id } = req.params;

    const response = await Hospital.findByIdAndUpdate(id, { status: false });

    if (response) {
        res.status(200).json({
            hospital: {
                id: id,
                name: response.name,
                status: false
            },
            message: 'Se deshabilito el Hospital correctamente.'
        });
    } else {
        res.status(400).json({
            message: 'Error al deshabilitar el Hospital.'
        });
    }
}

export {
    get,
    getById,
    create,
    update,
    deleteHospital
};