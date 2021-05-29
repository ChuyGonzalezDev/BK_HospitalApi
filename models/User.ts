import mongoose, { Schema, Document } from 'mongoose';
export interface IUser extends Document {
    // firstName: string;
    // lastName: string;    
    email: string;
    name: string;
    password: string;
    status?: boolean;
};

const UserSchema: Schema = new Schema({
    // firstName: { type: String, required: true },
    // lastName: { type: String, required: true },    
    email: { type: String, required: [true, 'El correo es obligatorio'], unique: true },
    name: { type: String, required: [true, 'El nombre es obligatorios'] },
    password: { type: String, required: true},
    status: { type: Boolean }
});

UserSchema.methods.toJSON = function() {        
    const { __v, _id, password, ...user } = <IUser>this.toObject();    
    user.id = _id;        
    return user;
};

/** Exporta el modelo y devuelve tu interfaz IUser */
export default mongoose.model<IUser>('User', UserSchema);