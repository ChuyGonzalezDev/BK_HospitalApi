import { response, request } from 'express';
import Doctor from '../models/Doctor';

require('dotenv').config

/** Obtener Doctores con paginación */
async function get(req = request, res = response) {
    const { rows = 5, from = 0 } = req.query;
    /** Únicamente los activos. */
    const query = { status: true };

    const [total, doctors] = await Promise.all([
        Doctor.countDocuments(query),
        Doctor.find(query).skip(Number(from)).limit(Number(rows))
    ]);

    res.json({
        total,
        doctors
    });
};

/** Obtener Doctores por Id */
async function getById(req = request, res = response) {
    const { id } = req.params;

    const doctor = await Doctor.findById(id);

    res.json({ doctor });
};

/** Crear Doctor */
async function create(req: any, res = response) {
    const {
        name, lastName, age, medicalSpeciality, phoneNumber, email, user, hospital
    } = req.body;

    const doctor = new Doctor({ name, lastName, age, medicalSpeciality, phoneNumber, email, user, hospital });

    try {
        /** Se asignan valores por Default */
        doctor.status = true;

        /** Crear usuario en BD */
        const response = await doctor.save();

        /** Respuesta exitosa */
        res.status(201).json({
            doctor: response,
            message: 'Creación de Doctor correctamente.'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Por favor hable con el administrador.'
        });
    }
};

/** Actualizar Doctor */
async function update(req = request, res = response) {
    const { id } = req.params;
    const { _id, ...doctor } = req.body;

    const response = await Doctor.findByIdAndUpdate(id, doctor);

    if (response) {
        res.status(200).json({
            doctor: {
                id: id,
                name: doctor.name,
                lastName: doctor.lastName,
                age: doctor.age,
                medicalSpeciality: doctor.medicalSpeciality,
                phoneNumber: doctor.medicalSpeciality,
                email: doctor.medicalSpeciality,
                user: doctor.medicalSpeciality,
                hospital: doctor.medicalSpeciality
            },
            message: 'Se realizó la actualización correctamente.'
        });
    } else {
        res.status(400).json({
            message: 'Error en la actualización.'
        });
    }
}

/** Deshabilitar Doctor */
async function deleteDoctor(req = request, res = response) {
    const { id } = req.params;

    const response = await Doctor.findByIdAndUpdate(id, { status: false });

    if (response) {
        res.status(200).json({
            Doctor: {
                id: id,
                name: response.name,
                status: false
            },
            message: 'Se deshabilito el Doctor correctamente.'
        });
    } else {
        res.status(400).json({
            message: 'Error al deshabilitar el Doctor.'
        });
    }
}

export {
    get,
    getById,
    create,
    update,
    deleteDoctor
};