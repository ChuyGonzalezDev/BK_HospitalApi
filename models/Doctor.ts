import mongoose, { Schema, Document } from 'mongoose';

export interface IDoctor extends Document {
    name: string;
    lastName: string;
    age: number;
    medicalSpeciality: string;
    phoneNumber: string;
    email: string;
    user: string;
    hospital: string;
    status?: boolean;
};

const DoctorSchema: Schema = new Schema({
    name: { type: String, required: [true, 'El nombre es obligatorio'], unique: true },
    lastName: { type: String, required: [true, 'El apellido es obligatorio'], unique: true },
    age: { type: Number, required: [true, 'La edad es obligatoria'] },
    medicalSpeciality: { type: String, required: [true, 'La especialidad medica es obligatoria'] },
    phoneNumber: { type: String, required: [true, 'El número teléfonico es obligatorio'] },
    email: { type: String, required: [true, 'El correo eléctronico es obligatorio'] },
    user: {
        type: Schema.Types.ObjectId, required: true, ref: 'User'
    },
    hospital: {
        type: Schema.Types.ObjectId, required: true, ref: 'Hospital'
    },
    status: { type: Boolean }
}, { collection: 'doctors' });

DoctorSchema.methods.toJSON = function () {
    const { __v, _id, ...doctor } = <IDoctor>this.toObject();
    doctor.id = _id;
    return doctor;
};

/** Exporta el modelo y devuelve su interfaz */
export default mongoose.model<IDoctor>('Doctor', DoctorSchema);