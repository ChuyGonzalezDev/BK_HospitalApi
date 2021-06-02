import mongoose, { Schema, Document } from 'mongoose';

export interface IHospital extends Document {
    name: string;
    address: string;
    cp: string;
    city: string;
    country: string;
    userId: string;
    status?: boolean;
};

const HospitalSchema: Schema = new Schema({
    name: { type: String, required: [true, 'El nombre es obligatorio'], unique: true },
    address: { type: String, required: [true, 'La dirección es obligatoria'] },
    cp: { type: String, required: [true, 'El Código Postal es obligatorio'] },
    city: { type: String, required: [true, 'La ciudad es obligatoria'] },
    country: { type: String, required: [true, 'El país es obligatorio'] },
    user: {
        type: Schema.Types.ObjectId, required: true, ref: 'User'
    },
    status: { type: Boolean }
}, { collection: 'hospitals' });

HospitalSchema.methods.toJSON = function () {
    const { __v, _id, ...hospital } = <IHospital>this.toObject();
    hospital.id = _id;
    return hospital;
};

/** Exporta el modelo y devuelve su interfaz */
export default mongoose.model<IHospital>('Hospital', HospitalSchema);