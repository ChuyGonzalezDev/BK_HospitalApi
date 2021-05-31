import User from "../models/User";

async function existEmail(email: string) {
    /** Verificar email existe.  */
    const existEmail = await User.findOne({ email });

    if (existEmail) {
        throw new Error(`El email ya se encuentra registrado: ${email}.`);
    }
};

async function existUserById(id: any) {
    const existUser = await User.findById(id);

    if (!existUser) {
        throw new Error(`El id no existe: ${id}.`);
    }
};

export {
    existEmail,
    existUserById
}
