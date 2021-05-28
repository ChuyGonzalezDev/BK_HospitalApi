import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {    
    // firstName: string;
    // lastName: string;
    name: string;
    email: string;
    password: string;
    status?: boolean;    
};

const UserSchema: Schema = new Schema({
    // firstName: { type: String, required: true },
    // lastName: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    status: { type: Boolean }
});

/** Exporta el modelo y devuelve tu interfaz IUser */
export default mongoose.model<IUser>('User', UserSchema);