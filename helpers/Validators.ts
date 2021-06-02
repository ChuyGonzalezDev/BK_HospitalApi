import Doctor from "../models/Doctor";
import Hospital from "../models/Hospital";
import User from "../models/User";

/** Verificar existe email Usuario */
async function existEmail(email: string) {
    const existEmail = await User.findOne({ email });

    if (existEmail) {
        throw new Error(`El email ya se encuentra registrado: ${email}.`);
    }
};

/** Verificar existe Usuario por Id */
async function existUserById(id: any) {
    const existUser = await User.findById(id);

    if (!existUser) {
        throw new Error(`El id no existe: ${id}.`);
    }
};

/** Verificar existe Hospital */
async function existHospital(name: string) {
    const exist = await Hospital.findOne({ name });
    console.log(exist);

    if (exist) {
        throw new Error(`Hospital ya registrado con el nombre: ${name}.`);
    }
}

/** Verificar existe Hospital por Id */
async function existHospitalById(id: string) {
    const exist = await Hospital.findById(id);

    if (!exist) {
        throw new Error(`El id no existe: ${id}.`);
    }

    if (!exist.status) {
        throw new Error(`El Hospital no se encuentra activo: ${id}.`);
    }
}

/** Verificar existe email Usuario */
async function existDoctorEmail(email: string) {
    const existEmail = await Doctor.findOne({ email });

    if (existEmail) {
        throw new Error(`El email del Doctor ya se encuentra registrado: ${email}.`);
    }
};

/** Verificar existe Hospital por Id */
async function existDoctorById(id: string) {
    const exist = await Doctor.findById(id);

    if (!exist) {
        throw new Error(`El id no existe: ${id}.`);
    }

    if (!exist.status) {
        throw new Error(`El Doctor no se encuentra activo: ${id}.`);
    }
}

export {
    existEmail,
    existUserById,
    existHospital,
    existHospitalById,
    existDoctorEmail,
    existDoctorById
}
